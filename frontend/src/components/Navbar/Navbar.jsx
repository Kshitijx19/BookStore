import React, { useState } from 'react'
import logo from "../../assets/logo.png";
import { Link } from 'react-router-dom';
import { FaGripLines } from "react-icons/fa";
import { useSelector } from 'react-redux';

const Navbar = () => {

  const links = [
    { title: "Home", link: "/" },
    { title: "All Books", link: "/all-books" },
    { title: "Cart", link: "/cart" },
    { title: "Profile", link: "/profile" },
    { title: "Admin Profile", link: "/profile" },
  ];

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);

  if (isLoggedIn === false) {
  links.splice(2, 2);
  }

  if (isLoggedIn === true && role === "user") {
    links.splice(4, 1);
  }

  if (isLoggedIn === true && role === "admin") {
    links.splice(3, 1);
  }
  // safer than splice (does not mutate array)
  const visibleLinks = isLoggedIn ? links : links.slice(0, 2);

  const [MobileNav, setMobileNav] = useState("hidden");

  return (
    <>
      <nav className='z-50 relative flex bg-zinc-800 text-white px-8 py-4 items-center justify-between'>

        <Link to="/" className='flex items-center'>
          <img src={logo} alt="Logo" className='w-15 h-15 inline-block mr-2' />
          <h1 className='text-2xl font-bold'>StoryStack</h1>
        </Link>

        <div className='nav-links-storytack block md:flex items-center gap-4'>

          {/* Desktop Links */}
          <div className='hidden md:flex gap-4'>
            {visibleLinks.map((items) => (
              <div key={items.title} className='flex items-center'>

                {items.title === "Profile" || items.title === "Admin Profile" ? (
                <Link
                  to={items.link}
                  className="px-4 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
                >
                  {role === "admin" ? "Admin Profile" : "Profile"}
                </Link>
              ) : (
                <Link
                  to={items.link}
                  className="hover:text-blue-500 transition-all duration-300"
                >
                  {items.title}
                </Link>
              )}

              </div>
            ))}
          </div>

          {/* Login / Signup */}
          {!isLoggedIn && (
            <div className='hidden md:flex gap-4'>
              <Link
                to="/login"
                className='px-4 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300'
              >
                LogIn
              </Link>

              <Link
                to="/signup"
                className='px-4 py-1 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300'
              >
                SignUp
              </Link>
            </div>
          )}

          {/* Mobile menu button */}
          <button
            className='block md:hidden text-white text-2xl hover:text-zinc-400'
            onClick={() => setMobileNav(MobileNav === "hidden" ? "block" : "hidden")}
          >
            <FaGripLines />
          </button>

        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`${MobileNav} bg-zinc-800 h-screen absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center`}>

        {visibleLinks.map((items) => (
          <Link
            key={items.title}
            to={items.link}
            className='text-white mb-8 text-4xl font-semibold hover:text-blue-500 transition-all duration-300'
            onClick={() => setMobileNav("hidden")}
          >
            {items.title}
          </Link>
        ))}

        {!isLoggedIn && (
          <>
            <Link
              to="/login"
              className='px-8 py-2 text-3xl text-semibold mb-8 border border-blue-500 rounded text-white hover:bg-white hover:text-zinc-800 transition-all duration-300'
            >
              LogIn
            </Link>

            <Link
              to="/signup"
              className='px-8 py-2 text-3xl text-semibold mb-8 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300'
            >
              SignUp
            </Link>
          </>
        )}

      </div>
    </>
  )
}

export default Navbar