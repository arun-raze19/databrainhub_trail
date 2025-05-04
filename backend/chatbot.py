import os
import requests
import PyPDF2
import json
import boto3
import chromadb
from flask import Flask, request, jsonify
from flask_cors import CORS
from sentence_transformers import SentenceTransformer
from chromadb.utils.embedding_functions import SentenceTransformerEmbeddingFunction

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173", "http://localhost:3000"], supports_credentials=True)

# AWS S3 Configuration
AWS_ACCESS_KEY = "AKIAVDLC3ZUR4S3GCTXA"
AWS_SECRET_KEY = "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"
S3_BUCKET_NAME = "data-brain-hub"
S3_FOLDER = "pdfs/"

# Local paths
PROCESSED_FILE_LIST = "processed_files.json"
LOCAL_PDF_FOLDER = "pdfs/"

# Initialize services
s3 = boto3.client('s3', aws_access_key_id=AWS_ACCESS_KEY, aws_secret_access_key=AWS_SECRET_KEY)
embedding_func = SentenceTransformerEmbeddingFunction(
    model_name="all-MiniLM-L6-v2"  # free and fast
)
chroma_client = chromadb.PersistentClient(path="./chroma_db")
collection = chroma_client.get_or_create_collection("chatbot_docs", embedding_function=embedding_func)

# Load processed files
def load_processed_files():
    if os.path.exists(PROCESSED_FILE_LIST):
        with open(PROCESSED_FILE_LIST, 'r') as f:
            return json.load(f)
    return []

# Save processed files
def save_processed_files(processed_files):
    with open(PROCESSED_FILE_LIST, 'w') as f:
        json.dump(processed_files, f)

# Download PDFs from S3
def download_new_pdfs():
    if not os.path.exists(LOCAL_PDF_FOLDER):
        os.makedirs(LOCAL_PDF_FOLDER)

    processed = load_processed_files()
    new_files = []

    response = s3.list_objects_v2(Bucket=S3_BUCKET_NAME, Prefix=S3_FOLDER)
    for obj in response.get("Contents", []):
        key = obj["Key"]
        file_name = os.path.basename(key)
        if file_name.endswith(".pdf") and file_name not in processed:
            local_path = os.path.join(LOCAL_PDF_FOLDER, file_name)
            s3.download_file(S3_BUCKET_NAME, key, local_path)
            print(f"✅ Downloaded: {file_name}")
            new_files.append(file_name)

    return new_files
"""""
# Extract and chunk PDF
def process_new_pdfs(new_files, chunk_size=500):
    for file in new_files:
        path = os.path.join(LOCAL_PDF_FOLDER, file)
        with open(path, 'rb') as pdf:
            reader = PyPDF2.PdfReader(pdf)
            for i, page in enumerate(reader.pages):
                text = page.extract_text()
                if text:
                    for j in range(0, len(text), chunk_size):
                        chunk = text[j:j + chunk_size]
                        collection.add(
                            documents=[chunk],
                            ids=[f"{file}_pg{i}_chunk{j}"],
                            metadatas=[{"source": file, "page": i}]
                        )
    print("✅ PDF chunks processed.")

# Refresh database
def refresh_documents():
    new_files = download_new_pdfs()
    if new_files:
        process_new_pdfs(new_files)
        processed = load_processed_files()
        save_processed_files(processed + new_files)
    else:
        print("✅ No new files found.")

refresh_documents()
"""
# Predefined answers
predefined_answers = {
    "What is machine learning?": "Machine learning is a subset of AI that enables systems to learn and improve from experience without being explicitly programmed.",
    "Who are the founders of AI?": "AI was pioneered by researchers like John McCarthy, Marvin Minsky, and Alan Turing.",
    "What is data science?": "Data science involves using techniques from statistics, machine learning, and computer science to analyze and interpret complex data."
}

chat_history = []

# GROQ configuration
GROQ_URL = "https://api.groq.com/openai/v1/chat/completions"
GROQ_HEADERS = {
    "Authorization": "Bearer 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",
    "Content-Type": "application/json"
}

@app.route("/chat", methods=["POST"])
def chat():
    user_question = request.json.get("question")
    if not user_question:
        return jsonify({"error": "No question provided"}), 400

    lower_q = user_question.lower()
    
    # Remove greeting check if it's interfering with your actual questions
    if any(greet in lower_q for greet in ["hi", "hello", "hey", "good morning", "good evening"]):
        if lower_q.strip() in ["hi", "hello", "hey", "good morning", "good evening"]:
            return jsonify({"answer": "Hello! 👋 How can I assist you today?"})
    
    if user_question in predefined_answers:
        return jsonify({"answer": predefined_answers[user_question]})

    # Continue processing the question if it's not a greeting
    try:
        print("🔍 Querying ChromaDB...")
        results = collection.query(query_texts=[user_question], n_results=3)
        context_chunks = results.get("documents", [[]])[0]
    except Exception as e:
        print(f"❌ ChromaDB Error: {e}")
        return jsonify({"error": "ChromaDB failed", "details": str(e)}), 500

    if not any(context_chunks):
        payload = {
            "model": "llama3-70b-8192",
            "messages": [
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": user_question}
            ],
            "max_tokens": 100,
            "temperature": 0.7
        }
        try:
            print("🌐 Sending to GROQ...")
            response = requests.post(GROQ_URL, headers=GROQ_HEADERS, json=payload).json()
            if "choices" not in response:
                print(f"❌ GROQ API failed: {response}")
                return jsonify({"error": "GROQ API failed", "details": response}), 500
            reply = response["choices"][0]["message"]["content"].strip()
            return jsonify({"answer": reply})
        except Exception as e:
            print(f"❌ GROQ request failed: {e}")
            return jsonify({"error": "GROQ request error", "details": str(e)}), 500

    # Construct context for GROQ
    context = "\n".join(context_chunks)
    if len(chat_history) >= 5:
        chat_history.pop(0)
    chat_history.append({"question": user_question})
    history_ctx = "\n\n".join(f"Q: {h['question']}\nA: {h.get('answer', '[no answer]')}" for h in chat_history[:-1])

    full_ctx = f"{history_ctx}\n\nPDF Context:\n{context}\n\nQuestion: {user_question}"

    payload = {
        "model": "llama3-70b-8192",
        "messages": [
            {"role": "system", "content": "You are a knowledgeable assistant. Answer only based on the PDF context provided."},
            {"role": "user", "content": full_ctx}
        ],
        "temperature": 0.7
    }

    try:
        print("🌐 Sending final context to GROQ...")
        response = requests.post(GROQ_URL, headers=GROQ_HEADERS, json=payload).json()
        if "choices" not in response:
            print(f"❌ GROQ API failed: {response}")
            return jsonify({"error": "GROQ API failed", "details": response}), 500
        answer = response["choices"][0]["message"]["content"].strip()
        chat_history[-1]["answer"] = answer
        return jsonify({"answer": answer})
    except Exception as e:
        print(f"❌ Final GROQ request failed: {e}")
        return jsonify({"error": "Final GROQ request error", "details": str(e)}), 500




if __name__ == "__main__":
    app.run(debug=True, port=3000)











