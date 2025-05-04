import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import Userrotutes from './routes/Userroutes.js'
import Authroute from './routes/authroute.js'
import SequelizeStore from 'connect-session-sequelize';
import db from "./config/database.js";
import './controllers/PdfDetails.js'
import { Server } from "socket.io";
import http from "http";
import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
dotenv.config();

const app = express();

AWS.config.update({
    accessKeyId: "AKIAVDLC3ZUR4S3GCTXA",
    secretAccessKey: "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",
    region: "ap-south-1",
    acl: "public-read",
  });

  const s3 = new AWS.S3();
  (async() =>{
   await db.sync();
}) ();


const mongourl = "mongodb+srv://noorani232004:5vj0vCSBiVhqgPyF@cluster.2btnttn.mongodb.net/";

mongoose.connect(mongourl)
.then(()=> {
    console.log("connected to database");
})
.catch((e) => console.log(e));

const storage = multer.memoryStorage();


const upload = multer({storage: storage});

const pdfSchema = mongoose.model("PdfDetails");
app.use("/images", express.static("files"));

app.use(cors({
    credentials: true,
    origin:  ['http://localhost:3000', 'http://localhost:5173', 'https://databrainhub-trail-ojq7.vercel.app']
}));

const pdfSchema1 = mongoose.model("PdfDetails1");

app.use(cors({
    credentials: true,
    origin:  ['http://localhost:3000', 'http://localhost:5173', 'https://databrainhub-trail-ojq7.vercel.app']
}));

const pdfSchema2 = mongoose.model("PdfDetails2");

app.use(cors({
    credentials: true,
    origin:  ['http://localhost:3000', 'http://localhost:5173']
}));

const pdfSchema3 = mongoose.model("PdfDetails3");

app.use(cors({
    credentials: true,
    origin:  ['http://localhost:3000', 'http://localhost:5173']
}));

const pdfSchema4 = mongoose.model("PdfDetails4");

app.use(cors({
    credentials: true,
    origin:  ['http://localhost:3000', 'http://localhost:5173']
}));

const pdfSchema5 = mongoose.model("PdfDetails5");

app.use(cors({
    credentials: true,
    origin:  ['http://localhost:3000', 'http://localhost:5173']
}));

const pdfSchema6 = mongoose.model("PdfDetails6");

app.use(cors({
    credentials: true,
    origin:  ['http://localhost:3000', 'http://localhost:5173']
}));

const pdfSchema7 = mongoose.model("PdfDetails7");

app.use(cors({
    credentials: true,
    origin:  ['http://localhost:3000', 'http://localhost:5173']
}));

const pdfSchema8 = mongoose.model("PdfDetails8");

app.use(cors({
    credentials: true,
    origin:  ['http://localhost:3000', 'http://localhost:5173']
}));

const pdfSchema9 = mongoose.model("PdfDetails9");

app.use(cors({
    credentials: true,
    origin:  ['http://localhost:3000', 'http://localhost:5173']
}));

const pdfSchema10 = mongoose.model("PdfDetails10");

app.use(cors({
    credentials: true,
    origin:  ['http://localhost:3000', 'http://localhost:5173']
}));

const pdfSchema12 = mongoose.model("PdfDetails12");

app.use(cors({
    credentials: true,
    origin:  ['http://localhost:3000', 'http://localhost:5173']
}));

const pdfSchema14 = mongoose.model("PdfDetails14");

app.use(cors({
    credentials: true,
    origin:  ['http://localhost:3000', 'http://localhost:5173']
}));

const pdfSchema15 = mongoose.model("PdfDetails15");

app.use(cors({
    credentials: true,
    origin:  ['http://localhost:3000', 'http://localhost:5173']
}));

app.post("/upload", upload.single("file"), async (req, res) => {
    console.log(req.file);
    const title = req.body.title;
    const filename = req.file.filename;
    try {
        await pdfSchema.create({title: title, pdf: filename});
        res.send({ status: "ok"});
    } catch (error) {
        res.json({status: error});
    }
});

app.post("/upload-1", upload.single("file"), async (req, res) => {
    console.log(req.file);

    const title = req.body.title;
    const semester = req.body.semester;
    const file = req.file;

    if (!file) {
      return res.status(400).send({ status: "error", message: "No file uploaded" });
    }

    const s3Params = {
      Bucket: "data-brain-hub",
      Key: `pdfs/${uuidv4()}-${file.originalname}`,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    try {
      const s3Result = await s3.upload(s3Params).promise();

      // Save the S3 file URL or Key in MongoDB
      await pdfSchema1.create({ title: title, pdf: s3Result.Location, semester});

      res.send({ status: "ok", url: s3Result.Location });
    } catch (error) {
      console.error("S3 Upload Error:", error);
      res.status(500).send({ status: "error", message: error.message });
    }
  });

  app.post("/upload-2", upload.single("file"), async (req, res) => {
    console.log(req.file);

    const title = req.body.title;
    const semester = req.body.semester;
    const file = req.file;

    if (!file) {
      return res.status(400).send({ status: "error", message: "No file uploaded" });
    }

    const s3Params = {
      Bucket: "data-brain-hub",
      Key: `pdfs/${uuidv4()}-${file.originalname}`,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    try {
      const s3Result = await s3.upload(s3Params).promise();

      // Save the S3 file URL or Key in MongoDB
      await pdfSchema2.create({ title: title, pdf: s3Result.Location, semester});

      res.send({ status: "ok", url: s3Result.Location });
    } catch (error) {
      console.error("S3 Upload Error:", error);
      res.status(500).send({ status: "error", message: error.message });
    }
  });

  app.post("/upload-3", upload.single("file"), async (req, res) => {
    console.log(req.file);

    const title = req.body.title;
    const semester = req.body.semester;
    const file = req.file;

    if (!file) {
      return res.status(400).send({ status: "error", message: "No file uploaded" });
    }

    const s3Params = {
      Bucket: "data-brain-hub",
      Key: `pdfs/${uuidv4()}-${file.originalname}`,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    try {
      const s3Result = await s3.upload(s3Params).promise();

      // Save the S3 file URL or Key in MongoDB
      await pdfSchema3.create({ title: title, pdf: s3Result.Location, semester});

      res.send({ status: "ok", url: s3Result.Location });
    } catch (error) {
      console.error("S3 Upload Error:", error);
      res.status(500).send({ status: "error", message: error.message });
    }
  });

  app.post("/upload-4", upload.single("file"), async (req, res) => {
    console.log(req.file);

    const title = req.body.title;
    const semester = req.body.semester;
    const file = req.file;

    if (!file) {
      return res.status(400).send({ status: "error", message: "No file uploaded" });
    }

    const s3Params = {
      Bucket: "data-brain-hub",
      Key: `pdfs/${uuidv4()}-${file.originalname}`,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    try {
      const s3Result = await s3.upload(s3Params).promise();

      // Save the S3 file URL or Key in MongoDB
      await pdfSchema4.create({ title: title, pdf: s3Result.Location, semester});

      res.send({ status: "ok", url: s3Result.Location });
    } catch (error) {
      console.error("S3 Upload Error:", error);
      res.status(500).send({ status: "error", message: error.message });
    }
  });

  app.post("/upload-5", upload.single("file"), async (req, res) => {
    console.log(req.file);

    const title = req.body.title;
    const semester = req.body.semester;
    const file = req.file;

    if (!file) {
      return res.status(400).send({ status: "error", message: "No file uploaded" });
    }

    const s3Params = {
      Bucket: "data-brain-hub",
      Key: `pdfs/${uuidv4()}-${file.originalname}`,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    try {
      const s3Result = await s3.upload(s3Params).promise();

      // Save the S3 file URL or Key in MongoDB
      await pdfSchema5.create({ title: title, pdf: s3Result.Location, semester});

      res.send({ status: "ok", url: s3Result.Location });
    } catch (error) {
      console.error("S3 Upload Error:", error);
      res.status(500).send({ status: "error", message: error.message });
    }
  });

  app.post("/upload-15", upload.single("file"), async (req, res) => {
    console.log(req.file);

    const title = req.body.title;
    const semester = req.body.semester;
    const file = req.file;

    if (!file) {
      return res.status(400).send({ status: "error", message: "No file uploaded" });
    }

    const s3Params = {
      Bucket: "data-brain-hub",
      Key: `pdfs/${uuidv4()}-${file.originalname}`,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    try {
      const s3Result = await s3.upload(s3Params).promise();

      // Save the S3 file URL or Key in MongoDB
      await pdfSchema15.create({ title: title, pdf: s3Result.Location, semester});

      res.send({ status: "ok", url: s3Result.Location });
    } catch (error) {
      console.error("S3 Upload Error:", error);
      res.status(500).send({ status: "error", message: error.message });
    }
  });

  app.post("/upload-6", upload.single("file"), async (req, res) => {
    console.log(req.file);

    const title = req.body.title;
    const semester = req.body.semester;
    const file = req.file;

    if (!file) {
      return res.status(400).send({ status: "error", message: "No file uploaded" });
    }

    const s3Params = {
      Bucket: "data-brain-hub",
      Key: `pdfs/${uuidv4()}-${file.originalname}`,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    try {
      const s3Result = await s3.upload(s3Params).promise();

      // Save the S3 file URL or Key in MongoDB
      await pdfSchema6.create({ title: title, pdf: s3Result.Location, semester});

      res.send({ status: "ok", url: s3Result.Location });
    } catch (error) {
      console.error("S3 Upload Error:", error);
      res.status(500).send({ status: "error", message: error.message });
    }
  });

  app.post("/upload-7", upload.single("file"), async (req, res) => {
    console.log(req.file);

    const title = req.body.title;
    const semester = req.body.semester;
    const file = req.file;

    if (!file) {
      return res.status(400).send({ status: "error", message: "No file uploaded" });
    }

    const s3Params = {
      Bucket: "data-brain-hub",
      Key: `pdfs/${uuidv4()}-${file.originalname}`,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    try {
      const s3Result = await s3.upload(s3Params).promise();

      // Save the S3 file URL or Key in MongoDB
      await pdfSchema7.create({ title: title, pdf: s3Result.Location, semester});

      res.send({ status: "ok", url: s3Result.Location });
    } catch (error) {
      console.error("S3 Upload Error:", error);
      res.status(500).send({ status: "error", message: error.message });
    }
  });

  app.post("/upload-8", upload.single("file"), async (req, res) => {
    console.log(req.file);

    const title = req.body.title;
    const semester = req.body.semester;
    const file = req.file;

    if (!file) {
      return res.status(400).send({ status: "error", message: "No file uploaded" });
    }

    const s3Params = {
      Bucket: "data-brain-hub",
      Key: `pdfs/${uuidv4()}-${file.originalname}`,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    try {
      const s3Result = await s3.upload(s3Params).promise();

      // Save the S3 file URL or Key in MongoDB
      await pdfSchema8.create({ title: title, pdf: s3Result.Location, semester});

      res.send({ status: "ok", url: s3Result.Location });
    } catch (error) {
      console.error("S3 Upload Error:", error);
      res.status(500).send({ status: "error", message: error.message });
    }
  });

  app.post("/upload-9", upload.single("file"), async (req, res) => {
    console.log(req.file);

    const title = req.body.title;
    const file = req.file;

    if (!file) {
      return res.status(400).send({ status: "error", message: "No file uploaded" });
    }

    const s3Params = {
      Bucket: "data-brain-hub",
      Key: `pdfs/${uuidv4()}-${file.originalname}`,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    try {
      const s3Result = await s3.upload(s3Params).promise();

      // Save the S3 file URL or Key in MongoDB
      await pdfSchema9.create({ title: title, pdf: s3Result.Location });

      res.send({ status: "ok", url: s3Result.Location });
    } catch (error) {
      console.error("S3 Upload Error:", error);
      res.status(500).send({ status: "error", message: error.message });
    }
  });
  app.post("/upload-10", upload.single("file"), async (req, res) => {
    console.log(req.file);

    const title = req.body.title;
    const file = req.file;

    if (!file) {
      return res.status(400).send({ status: "error", message: "No file uploaded" });
    }

    const s3Params = {
      Bucket: "data-brain-hub",
      Key: `pdfs/${uuidv4()}-${file.originalname}`,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    try {
      const s3Result = await s3.upload(s3Params).promise();

      // Save the S3 file URL or Key in MongoDB
      await pdfSchema10.create({ title: title, pdf: s3Result.Location });

      res.send({ status: "ok", url: s3Result.Location });
    } catch (error) {
      console.error("S3 Upload Error:", error);
      res.status(500).send({ status: "error", message: error.message });
    }
  });

  app.post("/upload-12", upload.single("file"), async (req, res) => {
    console.log(req.file);

    const title = req.body.title;
    const file = req.file;

    if (!file) {
      return res.status(400).send({ status: "error", message: "No file uploaded" });
    }

    const s3Params = {
      Bucket: "data-brain-hub",
      Key: `pdfs/${uuidv4()}-${file.originalname}`,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    try {
      const s3Result = await s3.upload(s3Params).promise();

      // Save the S3 file URL or Key in MongoDB
      await pdfSchema12.create({ title: title, pdf: s3Result.Location });

      res.send({ status: "ok", url: s3Result.Location });
    } catch (error) {
      console.error("S3 Upload Error:", error);
      res.status(500).send({ status: "error", message: error.message });
    }
  });

  app.post("/upload-14", upload.single("file"), async (req, res) => {
    console.log(req.file);

    const { title, semester, batch } = req.body;  // ✅ Accept semester and batch
    const file = req.file;

    if (!file) {
      return res.status(400).send({ status: "error", message: "No file uploaded" });
    }

    const s3Params = {
      Bucket: "data-brain-hub",
      Key: `pdfs/${uuidv4()}-${file.originalname}`,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    try {
      const s3Result = await s3.upload(s3Params).promise();

      // Save the S3 file URL + title + semester + batch in MongoDB
      await pdfSchema14.create({
        title: title,
        pdf: s3Result.Location,
        semester: semester,   // ✅ Save semester
        batch: batch          // ✅ Save batch
      });

      res.send({ status: "ok", url: s3Result.Location });
    } catch (error) {
      console.error("S3 Upload Error:", error);
      res.status(500).send({ status: "error", message: error.message });
    }
  });


app.get("/get-files", async (req, res) => {
    try {
        pdfSchema.find({}).then((data) => {
            res.send({ status: "ok", data: data });
        });
    } catch (error) {
        // Handle error
    }
});

app.get("/get-files1", async (req, res) => {
    const semester = req.query.semester; // optional query param
    try {
      const filter = semester ? { semester } : {};
      const data = await pdfSchema1.find(filter);
      res.send({ status: "ok", data });
    } catch (error) {
      res.status(500).send({ status: "error", message: error.message });
    }

    app.get("/get-files12", async (req, res) => {
      const semester = req.query.semester; // optional query param
      try {
        const filter = semester ? { semester } : {};
        const data = await pdfSchema12.find(filter);
        res.send({ status: "ok", data });
      } catch (error) {
        res.status(500).send({ status: "error", message: error.message });
      }
    });
  });

  app.get("/get-files1", async (req, res) => {
    const semester = req.query.semester; // optional query param
    try {
      const filter = semester ? { semester } : {};
      const data = await pdfSchema12.find(filter);
      res.send({ status: "ok", data });
    } catch (error) {
      res.status(500).send({ status: "error", message: error.message });
    }
  });

    app.get("/get-files14", async (req, res) => {
      const { semester, batch } = req.query; // ✅ get semester and batch from query params

      try {
        const filter = {};
        if (semester) {
          filter.semester = semester;
        }
        if (batch) {
          filter.batch = batch;
        }

        const data = await pdfSchema14.find(filter);
        res.send({ status: "ok", data });
      } catch (error) {
        res.status(500).send({ status: "error", message: error.message });
      }
    });


  app.get("/get-files2", async (req, res) => {
    const semester = req.query.semester; // optional query param
    try {
      const filter = semester ? { semester } : {};
      const data = await pdfSchema2.find(filter);
      res.send({ status: "ok", data });
    } catch (error) {
      res.status(500).send({ status: "error", message: error.message });
    }
  });

  app.get("/get-files15", async (req, res) => {
    const semester = req.query.semester; // optional query param
    try {
      const filter = semester ? { semester } : {};
      const data = await pdfSchema15.find(filter);
      res.send({ status: "ok", data });
    } catch (error) {
      res.status(500).send({ status: "error", message: error.message });
    }
  });

  app.get("/get-files3", async (req, res) => {
    const semester = req.query.semester; // optional query param
    try {
      const filter = semester ? { semester } : {};
      const data = await pdfSchema3.find(filter);
      res.send({ status: "ok", data });
    } catch (error) {
      res.status(500).send({ status: "error", message: error.message });
    }
  });

  app.get("/get-files4", async (req, res) => {
    const semester = req.query.semester; // optional query param
    try {
      const filter = semester ? { semester } : {};
      const data = await pdfSchema4.find(filter);
      res.send({ status: "ok", data });
    } catch (error) {
      res.status(500).send({ status: "error", message: error.message });
    }
  });

  app.get("/get-files5", async (req, res) => {
    const semester = req.query.semester; // optional query param
    try {
      const filter = semester ? { semester } : {};
      const data = await pdfSchema5.find(filter);
      res.send({ status: "ok", data });
    } catch (error) {
      res.status(500).send({ status: "error", message: error.message });
    }
  });


  app.get("/get-files6", async (req, res) => {
    const semester = req.query.semester; // optional query param
    try {
      const filter = semester ? { semester } : {};
      const data = await pdfSchema6.find(filter);
      res.send({ status: "ok", data });
    } catch (error) {
      res.status(500).send({ status: "error", message: error.message });
    }
  });

  app.get("/get-files7", async (req, res) => {
    const semester = req.query.semester; // optional query param
    try {
      const filter = semester ? { semester } : {};
      const data = await pdfSchema7.find(filter);
      res.send({ status: "ok", data });
    } catch (error) {
      res.status(500).send({ status: "error", message: error.message });
    }
  });

  app.get("/get-files8", async (req, res) => {
    const semester = req.query.semester; // optional query param
    try {
      const filter = semester ? { semester } : {};
      const data = await pdfSchema8.find(filter);
      res.send({ status: "ok", data });
    } catch (error) {
      res.status(500).send({ status: "error", message: error.message });
    }
  });

app.get("/get-files9", async (req, res) => {
    try {
        pdfSchema9.find({}).then((data) => {
            res.send({ status: "ok", data: data });
        });
    } catch (error) {
        // Handle error
    }
});

app.get("/get-files10", async (req, res) => {
    try {
        pdfSchema10.find({}).then((data) => {
            res.send({ status: "ok", data: data });
        });
    } catch (error) {
        // Handle error
    }
});



app.delete("/delete/:id", async (req, res) => {
    const pdfId = req.params.id;
    try {
        await pdfSchema.findByIdAndDelete(pdfId);
        res.send({ status: "ok" });
    } catch (error) {
        res.status(500).send({ status: "error", message: error.message });
    }
});

app.delete("/delete1/:id", async (req, res) => {
    const pdfId = req.params.id;
    try {
        await pdfSchema1.findByIdAndDelete(pdfId);
        res.send({ status: "ok" });
    } catch (error) {
        res.status(500).send({ status: "error", message: error.message });
    }
});


app.delete("/delete15/:id", async (req, res) => {
  const pdfId = req.params.id;
  try {
      await pdfSchema15.findByIdAndDelete(pdfId);
      res.send({ status: "ok" });
  } catch (error) {
      res.status(500).send({ status: "error", message: error.message });
  }
});

app.delete("/delete12/:id", async (req, res) => {
  const pdfId = req.params.id;
  try {
      await pdfSchema12.findByIdAndDelete(pdfId);
      res.send({ status: "ok" });
  } catch (error) {
      res.status(500).send({ status: "error", message: error.message });
  }
});

app.delete("/delete2/:id", async (req, res) => {
    const pdfId = req.params.id;
    try {
        await pdfSchema2.findByIdAndDelete(pdfId);
        res.send({ status: "ok" });
    } catch (error) {
        res.status(500).send({ status: "error", message: error.message });
    }
});

app.delete("/delete3/:id", async (req, res) => {
    const pdfId = req.params.id;
    try {
        await pdfSchema3.findByIdAndDelete(pdfId);
        res.send({ status: "ok" });
    } catch (error) {
        res.status(500).send({ status: "error", message: error.message });
    }
});

app.delete("/delete4/:id", async (req, res) => {
    const pdfId = req.params.id;
    try {
        await pdfSchema4.findByIdAndDelete(pdfId);
        res.send({ status: "ok" });
    } catch (error) {
        res.status(500).send({ status: "error", message: error.message });
    }
});

app.delete("/delete6/:id", async (req, res) => {
    const pdfId = req.params.id;
    try {
        await pdfSchema6.findByIdAndDelete(pdfId);
        res.send({ status: "ok" });
    } catch (error) {
        res.status(500).send({ status: "error", message: error.message });
    }
});

app.delete("/delete7/:id", async (req, res) => {
    const pdfId = req.params.id;
    try {
        await pdfSchema7.findByIdAndDelete(pdfId);
        res.send({ status: "ok" });
    } catch (error) {
        res.status(500).send({ status: "error", message: error.message });
    }
});

app.delete("/delete8/:id", async (req, res) => {
    const pdfId = req.params.id;
    try {
        await pdfSchema8.findByIdAndDelete(pdfId);
        res.send({ status: "ok" });
    } catch (error) {
        res.status(500).send({ status: "error", message: error.message });
    }
});

app.delete("/delete9/:id", async (req, res) => {
    const pdfId = req.params.id;
    try {
        await pdfSchema9.findByIdAndDelete(pdfId);
        res.send({ status: "ok" });
    } catch (error) {
        res.status(500).send({ status: "error", message: error.message });
    }
});

app.delete("/delete14/:id", async (req, res) => {
  const pdfId = req.params.id;
  try {
      await pdfSchema14.findByIdAndDelete(pdfId);
      res.send({ status: "ok" });
  } catch (error) {
      res.status(500).send({ status: "error", message: error.message });
  }
});

app.delete("/delete10/:id", async (req, res) => {
    const pdfId = req.params.id;
    try {
        await pdfSchema10.findByIdAndDelete(pdfId);
        res.send({ status: "ok" });
    } catch (error) {
        res.status(500).send({ status: "error", message: error.message });
    }
});

app.delete("/delete5/:id", async (req, res) => {
    const pdfId = req.params.id;
    try {
        await pdfSchema5.findByIdAndDelete(pdfId);
        res.send({ status: "ok" });
    } catch (error) {
        res.status(500).send({ status: "error", message: error.message });
    }
});



const imageSchema = mongoose.model("ImageDetails");

app.post("/upload-image", upload.single("file"), async (req, res) => {
    console.log("Received file:", req.file);

    const { title, description } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).send({ status: "error", message: "No file uploaded" });
    }

    const s3Params = {
      Bucket: "data-brain-hub",
      Key: `images/${uuidv4()}-${file.originalname}`,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    try {
      const s3Result = await s3.upload(s3Params).promise();

      // Save title, description, and S3 URL to MongoDB
      await imageSchema.create({
        title: title,
        description: description,
        image: s3Result.Location, // Save full S3 URL
      });

      res.send({ status: "ok", url: s3Result.Location });
    } catch (error) {
      console.error("S3 Upload Error:", error);
      res.status(500).send({ status: "error", message: error.message });
    }
  });

app.get("/get-images", async (req, res) => {
    try {
        imageSchema.find({}).then((data) => {
            res.send({ status: "ok", data: data });
        });
    } catch (error) {
        // Handle error
    }
});

app.delete("/delete11/:id", async (req, res) => {
    const imageId = req.params.id;
    try {
        await imageSchema.findByIdAndDelete(imageId);
        res.send({ status: "ok" });
    } catch (error) {
        res.status(500).send({ status: "error", message: error.message });
    }
});

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
    db: db
});

app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    //store: store,
    cookie: {
        secure: 'auto'
    }
}));

app.use(express.json ());
app.use(Userrotutes);
app.use(Authroute);
app.use(express.urlencoded({ extended: true }));

const server = http.createServer(app); // Create HTTP server

const io = new Server(server, { // Initialize socket.io with the server
    cors: {
        origin:  ['http://localhost:3000', 'http://localhost:5173'],
        methods: ["GET", "POST"]
    }
});

app.get('/',(req,res) => {
    res.json("Api is working ");
})

const messageSchema = new mongoose.Schema({
    message: String,
    user: String,
    time: String
});

const Message = mongoose.models.Message || mongoose.model("Message", messageSchema);

app.get("/get-messages", async (req, res) => {
    try {
        const messages = await Message.find({});
        res.send({ status: "ok", data: messages });
    } catch (error) {
        res.status(500).send({ status: "error", message: error.message });
    }
});

app.delete("/delete-message/:id", async (req, res) => {
    const messageId = req.params.id;
    try {
        await Message.findByIdAndDelete(messageId);
        res.send({ status: "ok" });
    } catch (error) {
        res.status(500).send({ status: "error", message: error.message });
    }
});



io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("send-message", async (messageData) => {
        try {
            // Create a new message document
            const message = new Message({
                message: messageData.message,
                user: messageData.user,
                time: messageData.time
            });
            // Save the message to the database
            await message.save();
            // Broadcast the message to all connected clients
            io.emit("received-message", messageData);
        } catch (error) {
            console.error("Error saving message:", error);
        }
    });

    socket.on("logout", () => {
        // Emit logout event to all connected clients
        io.emit("user-logout", socket.id);
        console.log(`User disconnected: ${socket.id}`);
    });

    socket.on("disconnect", () => {
        // Emit logout event to all connected clients
        io.emit("user-logout", socket.id);
        console.log(`User disconnected: ${socket.id}`);
    });
});

app.get("/", async (req, res) => {
    res.send("success!!!");
});

// For local development
if (process.env.NODE_ENV !== 'production') {
  server.listen(5000, () => {
    console.log('Socket server running on port 5000');
  });

  app.listen(process.env.APP_PORT || 5173, () => {
    console.log('server up and running...');
  });
}

// Export the Express app and Socket.io server for Vercel
export default app;
export { server };