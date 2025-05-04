import React from 'react';

const FallbackContent = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-gradient">DataBrainHub</h1>
          <p className="text-xl text-gray-300">Your Data Science Platform</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-blue-400">Resource Sharing</h2>
            <p className="text-gray-300">Access and share educational resources in one centralized platform.</p>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-green-400">Cloud Storage</h2>
            <p className="text-gray-300">Store and access your files from anywhere with our cloud integration.</p>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-purple-400">Collaboration</h2>
            <p className="text-gray-300">Work together with classmates and teachers in real-time.</p>
          </div>
        </div>
        
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center text-yellow-400">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start">
              <div className="bg-gray-700 p-2 rounded-full mr-4">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Resource Library</h3>
                <p className="text-gray-300">Access books, notes, and study materials for all years.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-gray-700 p-2 rounded-full mr-4">
                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Academic Calendar</h3>
                <p className="text-gray-300">Stay updated with important academic dates and events.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-gray-700 p-2 rounded-full mr-4">
                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"></path>
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">ClassBridge Chat</h3>
                <p className="text-gray-300">Communicate with classmates and teachers in real-time.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-gray-700 p-2 rounded-full mr-4">
                <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">AI Chatbot</h3>
                <p className="text-gray-300">Get instant answers to your academic questions.</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <p className="text-gray-400 mb-4">© 2025 DataBrainHub. All rights reserved.</p>
          <div className="flex justify-center space-x-4">
            <a href="#" className="text-blue-400 hover:text-blue-300">Terms</a>
            <a href="#" className="text-blue-400 hover:text-blue-300">Privacy</a>
            <a href="#" className="text-blue-400 hover:text-blue-300">Contact</a>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .text-gradient {
          background: linear-gradient(90deg, #7928CA, #FF0080);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>
    </div>
  );
};

export default FallbackContent;
