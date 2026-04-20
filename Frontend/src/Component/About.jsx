import React from "react";

function About() {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-indigo-200 to-purple-200 p-6">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-xl text-center">
        
        <h2 className="text-3xl font-bold mb-4 text-purple-700">About This App</h2>

        <p className="text-gray-600 mb-4">
          This Notes App is built using MERN Stack where users can securely
          login and manage their personal notes.
        </p>

        <p className="text-gray-600">
          Features include authentication, CRUD operations, and a modern UI.
        </p>
      </div>
    </div>
  );
}

export default About;