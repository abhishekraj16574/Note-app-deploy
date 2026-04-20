import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/Auth";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="backdrop-blur-md bg-white/30 shadow-md px-6 py-3 flex justify-between items-center sticky top-0 z-50">
      
      <h1 className="text-xl font-bold text-purple-700">📝 NotesApp</h1>

      <div className="flex gap-5 items-center">
        <Link to="/" className="hover:text-purple-600">Home</Link>
        <Link to="/about" className="hover:text-purple-600">About</Link>
        <Link to="/contact" className="hover:text-purple-600">Contact</Link>

        {user ? (
          <>
            
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-purple-500 text-white px-3 py-1 rounded"
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
}

export default Navbar;