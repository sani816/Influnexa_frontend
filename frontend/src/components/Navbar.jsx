import { Link,useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes, FaCog } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const { user, logout } = useAuth();
const navigate = useNavigate();
const handleLogout = () => {

  logout();

  navigate("/");

};
  return (
    <nav className="bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">

        {/* Logo */}
         <h1 className="text-2xl font-bold text-white">
    InfluNexa
  </h1>

        {/* Desktop Menu */}
         <ul className="hidden lg:flex gap-8 text-white text-base absolute left-1/2 -translate-x-1/2">
          <li><Link to="/home" className="hover:text-fuchsia-500">Home</Link></li>
          <li><Link to="/about" className="hover:text-fuchsia-500">About</Link></li>
          <li><Link to="/featuredcreators" className="hover:text-fuchsia-500">Creators</Link></li>
          <li><Link to="/blog" className="hover:text-fuchsia-500">Blog</Link></li>
           <li>
    <Link to="/campaigns" className="hover:text-fuchsia-500">
      Campaigns
    </Link>

    <Link
        to="/subscription"
        className="hover:text-fuchsia-500"
    >
        Subscription
    </Link>
  </li>
          <li><Link to="/contact" className="hover:text-fuchsia-500">Contact</Link></li>
        </ul>

         {/* Right Buttons */}
  <div className="flex items-center gap-2">


    {/* Register Dropdown */}
    <div className="relative">

      <button
        onClick={() => setRegisterOpen(!registerOpen)}
        className="
        bg-purple-600
        hover:bg-purple-700
        px-3
        py-2
        rounded-lg
        text-white
        text-sm
        font-semibold
        "
      >
        Register ▾
      </button>


      {
        registerOpen && (
          <div
          className="
          absolute
          right-0
          mt-2
          w-48
          bg-white
          rounded-lg
          shadow-xl
          overflow-hidden
          z-50
          "
          >

            <button
  onClick={() => {
    setRegisterOpen(false);

    setTimeout(() => {
      window.dispatchEvent(
        new Event("open-brand-form")
      );
    }, 100);
  }}
  className="
    w-full
    text-left
    px-4
    py-3
    text-gray-800
    hover:bg-gray-100
  "
>
  Register as Brand
</button>


<button
  onClick={() => {
    setRegisterOpen(false);

    setTimeout(() => {
      window.dispatchEvent(
        new Event("open-creator-form")
      );
    }, 100);
  }}
  className="
    w-full
    text-left
    px-4
    py-3
    text-gray-800
    hover:bg-gray-100
  "
>
  Register as Creator
</button>


          </div>
        )
      }


    </div>



    {/* Consultation */}
    <Link
  to="/contact#consultation-form"
  className="
  hidden lg:block
  bg-cyan-600
  hover:bg-cyan-700
  px-3
  py-2
  rounded-lg
  text-white
  text-sm
  font-semibold
  "
>
  Book Consultation
</Link>



    {/* Logout */}
    {
 user && (
  <button
    onClick={handleLogout}
    className="
    hidden lg:block
    bg-red-500
    hover:bg-red-700
    px-3
    py-2
    rounded-lg
    text-white
    text-sm
    font-semibold
    "
  >
    Logout
  </button>
 )
}
      {/* Mobile Menu */}
    <button
      onClick={() => setMenuOpen(true)}
      className="lg:hidden text-white text-2xl"
    >
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

          <Link onClick={() => setMenuOpen(false)} to="/home">Home</Link>
          <Link onClick={() => setMenuOpen(false)} to="/about">About</Link>
          <Link onClick={() => setMenuOpen(false)} to="/featuredcreators">Creators</Link>
          <Link onClick={() => setMenuOpen(false)} to="/blog">Blog</Link>
          <Link 
  onClick={() => setMenuOpen(false)} 
  to="/campaigns"
>
  Campaigns
</Link>

<Link
        to="/subscription"
        className="hover:text-fuchsia-500"
    >
        Subscription
    </Link>
          <Link onClick={() => setMenuOpen(false)} to="/contact">Contact</Link>

          <Link
            onClick={() => setMenuOpen(false)}
            to="/contact#consultation-form"
            className="mt-4 bg-cyan-600 hover:bg-cyan-800 px-4 py-2 rounded-lg text-center"
          >
            Book Consultation
          </Link>

          {
    user && (
      <button
        onClick={()=>{
          setMenuOpen(false);
          handleLogout();
        }}
        className="
        bg-red-500
        hover:bg-red-700
        px-4
        py-2
        rounded-lg
        text-center
        "
      >
        Logout
      </button>
    )
  }
        </div>

      </div>
    </nav>
  );
}