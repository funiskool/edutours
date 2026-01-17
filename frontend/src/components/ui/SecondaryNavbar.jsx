import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SecondaryNavbar() {
  const [open, setOpen] = useState(null); // Dropdown open state
  const [show, setShow] = useState(true); // Navbar scroll show/hide
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false); // Mobile menu toggle

  // Scroll behavior: hide on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 100) {
        setShow(false);
      } else {
        setShow(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const menuClass =
    "relative cursor-pointer px-4 py-2 text-[15px] font-medium text-white flex items-center gap-1 hover:text-sky-300 transition-colors";

  const dropdownClass =
    "absolute left-0 top-full mt-2 w-56 rounded-lg bg-[#0b1d33] shadow-xl border border-white/10 z-50";

  const itemClass =
    "block px-4 py-2 text-sm text-white hover:bg-white/10 hover:text-sky-300 transition-colors";

  const dropdownAnim = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 10 },
  };

  const arrowAnim = {
    closed: { rotate: 0 },
    open: { rotate: 180 },
  };

  return (
    <>
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: show ? 0 : -80 }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="fixed top-[72px] left-0 right-0 w-full bg-[#081a2f] border-b border-white/10 z-50"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 h-[48px]">
          
          {/* Logo / Mobile Hamburger */}
          <div className="flex items-center justify-between w-full md:w-auto">
            <div className="text-white font-bold text-lg md:text-xl">Tours</div>
            
            {/* Hamburger Button */}
            <button
              className="md:hidden text-white ml-2"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {mobileOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            {/* International Tours */}
            <div
              className={menuClass}
              onMouseEnter={() => setOpen("international")}
              onMouseLeave={() => setOpen(null)}
            >
              International Tours
              <motion.span
                variants={arrowAnim}
                animate={open === "international" ? "open" : "closed"}
                className="text-xs"
              >
                ▼
              </motion.span>

              <AnimatePresence>
                {open === "international" && (
                  <motion.div
                    variants={dropdownAnim}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{ duration: 0.25 }}
                    className={dropdownClass}
                  >
                    <span className={itemClass}>Europe</span>
                    <span className={itemClass}>Dubai</span>
                    <span className={itemClass}>Singapore</span>
                    <span className={itemClass}>Thailand</span>
                    <span className={itemClass}>Phuket</span>
                    <span className={itemClass}>Phuket</span>
                    <span className={itemClass}>Bangkok</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* India Tours */}
            <div
              className={menuClass}
              onMouseEnter={() => setOpen("india")}
              onMouseLeave={() => setOpen(null)}
            >
              India Tours
              <motion.span
                variants={arrowAnim}
                animate={open === "india" ? "open" : "closed"}
                className="text-xs"
              >
                ▼
              </motion.span>

              <AnimatePresence>
                {open === "india" && (
                  <motion.div
                    variants={dropdownAnim}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{ duration: 0.25 }}
                    className={dropdownClass}
                  >
                    <span className={itemClass}>Himachal Pradesh</span>
                    <span className={itemClass}>Uttrakhand</span>
                    <span className={itemClass}>Rajasthan</span>
                    <span className={itemClass}>Goa</span>
                    <span className={itemClass}>Gujarat</span>
                    <span className={itemClass}>Kerala</span>
                    <span className={itemClass}>Andaman & Nicobar</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className={menuClass}>Corporate Tours</div>

            {/* Specialty Tours */}
            <div
              className={menuClass}
              onMouseEnter={() => setOpen("specialty")}
              onMouseLeave={() => setOpen(null)}
            >
              Specialty Tours
              <motion.span
                variants={arrowAnim}
                animate={open === "specialty" ? "open" : "closed"}
                className="text-xs"
              >
                ▼
              </motion.span>

              <AnimatePresence>
                {open === "specialty" && (
                  <motion.div
                    variants={dropdownAnim}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{ duration: 0.25 }}
                    className={dropdownClass}
                  >
                    <span className={itemClass}>Honeymoon Tours</span>
                    <span className={itemClass}>Couple Tours</span>
                    <span className={itemClass}>Family Tours</span>
                    <span className={itemClass}>Adventure & Trekking</span>
                    <span className={itemClass}>Second Innings Tours</span>
                    <span className={itemClass}>Friendship Tours</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <a 
              href="https://www.funiskool.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className={menuClass}
            >
              Educational Tours
            </a>
            <div className={menuClass}>Customized Tours</div>
            <div className={menuClass}>Inbound Tours</div>
          </div>
        </div>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-[#081a2f] border-t border-white/10"
            >
              <div className="flex flex-col gap-1 p-4">
                {/* Repeat menu items for mobile */}
                {["International Tours", "India Tours", "Corporate Tours", "Specialty Tours", "Educational Tours", "Customized Tours", "Inbound Tours"].map((menu) => (
                  <div key={menu} className="text-white py-2 border-b border-white/10">{menu}</div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
