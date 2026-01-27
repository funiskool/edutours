import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function Header() {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { user, role, signOut, loading } = useAuth();


  const navigate = useNavigate();

  // Scroll hide/show logic
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 80) {
        setShow(false);
      } else {
        setShow(true);
      }
      setLastScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
  await signOut();
  setOpen(false);
  navigate("/");
};

const dashboardPath =
  role === "admin" ? "/admin-panel" : "/user-dashboard";


  if (loading) return null;

  return (
    <>
      {/* NAVBAR */}
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: show ? 0 : -120 }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="fixed top-0 left-0 right-0 z-40 bg-white backdrop-blur-md shadow-sm"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 h-[72px]">

          {/* LOGO */}
          <Link to="/">
            <img
              src="/assets/images/logo.jpeg"
              alt="Logo"
              className="h-14 w-auto object-contain"
            />
          </Link>

          {/* SEARCH BAR */}
          <div className="hidden md:flex items-center w-full max-w-xl mx-8 relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="absolute left-4 text-black w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search tours, destinations, packages..."
              className="w-full rounded-full border border-gray-300 bg-white/90 py-3 pl-12 pr-4 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* RIGHT ACTION AREA */}
          {!user ? (
            // 🔐 NOT LOGGED IN
            <Link
              to="/login"
              className="px-6 py-3 rounded-md bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              Login
            </Link>
          ) : (
            // 👤 LOGGED IN
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setOpen(!open)}
                className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-lg"
              >
                👤
              </button>

              {open && (
                <div className="absolute right-0 mt-3 w-48 bg-white border rounded-lg shadow-lg overflow-hidden">
                  <Link
                    to={dashboardPath}
                    className="block px-4 py-3 hover:bg-gray-100"
                    onClick={() => setOpen(false)}
                  >
                    My Account
                  </Link>
                  <Link
                    to={dashboardPath}
                    className="block px-4 py-3 hover:bg-gray-100"
                    onClick={() => setOpen(false)}
                  >
                    My Bookings
                  </Link>
                  <Link
                    to={dashboardPath}
                    className="block px-4 py-3 hover:bg-gray-100"
                    onClick={() => setOpen(false)}
                  >
                    My Wishlist
                  </Link>
                  
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 text-red-600 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </motion.header>

      {/* FLOATING WHATSAPP BUTTON */}
      <a
        href="https://wa.me/919818990772"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-[9999] flex h-14 w-14 items-center justify-center rounded-full bg-green-500 shadow-lg hover:scale-105 transition-transform duration-200"
        aria-label="Chat on WhatsApp"
      >
        <img
          src="data:image/png;base64,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"
          alt="WhatsApp"
          className="rounded-full"
        />
      </a>
    </>
  );
}
