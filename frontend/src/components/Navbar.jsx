import { Link } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes, FaCog } from "react-icons/fa";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">

        {/* Logo */}
        <h1 className="text-2xl font-bold text-white">
          InfluNexa
        </h1>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex gap-6 text-white text-lg">
          <li><Link to="/" className="hover:text-fuchsia-500">Home</Link></li>
          <li><Link to="/about" className="hover:text-fuchsia-500">About</Link></li>
          <li><Link to="/featuredcreators" className="hover:text-fuchsia-500">Creators</Link></li>
          <li><Link to="/blog" className="hover:text-fuchsia-500">Blog</Link></li>
          <li><Link to="/contact" className="hover:text-fuchsia-500">Contact</Link></li>
        </ul>

        {/* Desktop Button */}
        <Link
          to="/contact#consultation-form"
          className="hidden lg:block bg-cyan-600 hover:bg-cyan-800 px-4 py-2 rounded-lg text-white font-semibold"
        >
          Book Consultation
        </Link>

        {/* Mobile Buttons */}
        <div className="lg:hidden flex items-center gap-3 text-white">

          {/* Settings icon (phone-like feature) */}
          <FaCog className="text-xl cursor-pointer hover:text-fuchsia-500" />

          {/* Menu toggle */}
          <button onClick={() => setMenuOpen(true)} className="text-2xl">
            <FaBars />
          </button>
        </div>

      </div>

      {/* Overlay */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 bg-black/60 z-40"
        />
      )}

      {/* Side Drawer (Phone Style Menu) */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-gray-800 z-50 transform transition-transform duration-300
        ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
      >

        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h2 className="text-white text-lg font-bold">Menu</h2>
          <button onClick={() => setMenuOpen(false)} className="text-white text-2xl">
            <FaTimes />
          </button>
        </div>

        {/* Links */}
        <div className="flex flex-col p-4 gap-4 text-white">

          <Link onClick={() => setMenuOpen(false)} to="/">Home</Link>
          <Link onClick={() => setMenuOpen(false)} to="/about">About</Link>
          <Link onClick={() => setMenuOpen(false)} to="/featuredcreators">Creators</Link>
          <Link onClick={() => setMenuOpen(false)} to="/blog">Blog</Link>
          <Link onClick={() => setMenuOpen(false)} to="/contact">Contact</Link>

          <Link
            onClick={() => setMenuOpen(false)}
            to="/contact#consultation-form"
            className="mt-4 bg-cyan-600 hover:bg-cyan-800 px-4 py-2 rounded-lg text-center"
          >
            Book Consultation
          </Link>
        </div>

      </div>
    </nav>
  );
}