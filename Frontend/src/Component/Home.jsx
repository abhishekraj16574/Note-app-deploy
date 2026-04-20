import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../Context/Auth";

function Home() {
  const { user, loading } = useContext(AuthContext);

  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [quotes, setQuotes] = useState("");

  const fetchNotes = async () => {
    try {
      const res = await axios.get("/api/v1/note/getnote", {
        withCredentials: true,
      });
      setNotes(res.data.notes);
    } catch (err) {
      console.log(err);
    }
  };

  const addNote = async () => {
    if (!title || !quotes) return;
    try {
      const res = await axios.post(
        "/api/v1/note/newnote",
        { title, quotes },
        { withCredentials: true }
      );
      setNotes([res.data.note, ...notes]); // 🔥 top pe add
      setTitle("");
      setQuotes("");
    } catch (err) {
      console.log(err);
    }
  };

  const deleteNote = async (id) => {
    try {
      await axios.delete(`/api/v1/note/deletenote/${id}`, {
        withCredentials: true,
      });
      setNotes(notes.filter((n) => n._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (user) fetchNotes();
  }, [user]);

  if (loading) return <h2 className="text-center mt-10">Loading...</h2>;
  if (!user) return <h2 className="text-center mt-10">Please Login</h2>;

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-200 to-pink-200 p-6">
      
      <h1 className="text-3xl font-bold text-center mb-6">
        Welcome {user.name} 👋
      </h1>

      {/* Add Note */}
      <div className="max-w-md mx-auto bg-white p-5 rounded-2xl shadow-lg mb-8">
        <input
          className="w-full border p-2 rounded mb-3"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="w-full border p-2 rounded mb-3"
          placeholder="Write your note..."
          value={quotes}
          onChange={(e) => setQuotes(e.target.value)}
        />

        <button
          onClick={addNote}
          className="w-full bg-purple-500 text-white py-2 rounded hover:bg-purple-600"
        >
          Add Note
        </button>
      </div>

      {/* Notes List */}
      <div className="grid md:grid-cols-3 gap-6">
        {notes.map((note) => (
          <div
            key={note._id}
            className="bg-white p-4 rounded-2xl shadow-md hover:shadow-xl transition duration-300"
          >
            <h3 className="text-xl font-semibold mb-2">{note.title}</h3>
            <p className="text-gray-600 mb-4">{note.quotes}</p>

            <button
              onClick={() => deleteNote(note._id)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;