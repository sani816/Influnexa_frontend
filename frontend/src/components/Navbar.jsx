import { Link } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

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

          <li>
            <Link
              to="/"
              className="hover:text-fuchsia-500 transition"
            >
              Home
            </Link>
          </li>

          <li>
            <Link
              to="/about"
              className="hover:text-fuchsia-500 transition"
            >
              About
            </Link>
          </li>

          <li>
            <Link
              to="/featuredcreators"
              className="hover:text-fuchsia-500 transition"
            >
              Featured Creators
            </Link>
          </li>

          <li>
            <Link
              to="/blog"
              className="hover:text-fuchsia-500 transition"
            >
              Blog
            </Link>
          </li>

          <li>
            <Link
              to="/contact"
              className="hover:text-fuchsia-500 transition"
            >
              Contact
            </Link>
          </li>

        </ul>

        {/* Desktop Button */}
        <Link
          to="/contact#consultation-form"
          className="hidden lg:block bg-cyan-600 hover:bg-cyan-800 px-4 py-2 rounded-lg text-white font-semibold transition"
        >
          Book Consultation
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-white text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-gray-800 border-t border-gray-700">

          <ul className="flex flex-col text-center text-white py-4 gap-4">

            <li>
              <Link
                to="/"
                onClick={() => setMenuOpen(false)}
                className="hover:text-fuchsia-500"
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                to="/about"
                onClick={() => setMenuOpen(false)}
                className="hover:text-fuchsia-500"
              >
                About
              </Link>
            </li>

            <li>
              <Link
                to="/featuredcreators"
                onClick={() => setMenuOpen(false)}
                className="hover:text-fuchsia-500"
              >
                Featured Creators
              </Link>
            </li>

            <li>
              <Link
                to="/blog"
                onClick={() => setMenuOpen(false)}
                className="hover:text-fuchsia-500"
              >
                Blog
              </Link>
            </li>

            <li>
              <Link
                to="/contact"
                onClick={() => setMenuOpen(false)}
                className="hover:text-fuchsia-500"
              >
                Contact
              </Link>
            </li>

            <li>
              <Link
                to="/contact#consultation-form"
                onClick={() => setMenuOpen(false)}
                className="bg-cyan-600 hover:bg-cyan-800 px-4 py-2 rounded-lg inline-block mx-auto"
              >
                Book Consultation
              </Link>
            </li>

          </ul>

        </div>
      )}
    </nav>
  );
}