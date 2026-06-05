import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">

        <h1 className="text-2xl font-bold text-center mb-1 animated-heading ">
          InfluNexa
        </h1>

        <ul className="hidden md:flex gap-6 text-white text-lg">
          <li>
            <Link to="/" className="hover:text-fuchsia-500">
              Home
            </Link>
          </li>

          <li>
            <Link to="/about" className="hover:text-fuchsia-500">
              About
            </Link>
          </li>

          <li>
            <Link
              to="/FeaturedCreators"
              className="hover:text-fuchsia-500"
            >
              Featured Creators
            </Link>
          </li>

          <li>
            <Link to="/blog" className="hover:text-fuchsia-500">
              Blog
            </Link>
          </li>

          <li>
            <Link to="/contact" className="hover:text-fuchsia-500">
              Contact
            </Link>
          </li>
        </ul>

        <Link
          to="/contact#consultation-form"
          className="bg-cyan-600 hover:bg-cyan-800 px-4 py-2 rounded-lg text-white font-semibold transition"
        >
          Book Consultation
        </Link>

      </div>
    </nav>
  );
}