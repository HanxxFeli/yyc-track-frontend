import { Link, NavLink } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import logo from "../assets/logo-white.png";
import profileIcon from "../assets/profile-icon.png";
import { useAuth } from '../contexts/AuthContext'; 

/**
 * Header Component
 * 
 * A reusable navigation header that displays:
 * - Logo 
 * - Navigation links
 * - Feedback links (only visible when logged in)
 * - Login button when logged out, OR profile icon with dropdown menu when logged in.
 * - Dropdown includes Account Settings + Logout (for now)
 * - Dropdown auto-closes when clicking outside
 * - Animated arrow indicator rotates when menu is open
 * 
 * Props:
 * - isLoggedIn (boolean): determines which UI to display.
 * 
 * Notes:
 * - Logout currently clears localStorage token and refreshes the page
 * - Authentication logic will be replaced once backend is integrated
 */

const Header = () => {
  const { user, logout } = useAuth(); // Get user and logout from context
  const isLoggedIn = !!user; // Derive isLoggedIn from user, double boolean

  // state to track if the dropdown is open
  const [ isDropdownOpen, setIsDropdownOpen ] = useState(false);

  // ref to detect clicks outside the dropdown container
  const dropdownRef = useRef(null);

  // close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return() => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // handle logout 
  const handleLogout = () => {
    logout(); // use logout from authcontext and this will clear token and navigate to /login 
    setIsDropdownOpen(false);
  };

  return (
    // main header container
    <header className="w-full bg-[#BC0B2A] text-white px-10 py-3 flex items-center justify-between shadow-md">

      {/* Left side of Header (logo) */}
      <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition">
      <img
        src={logo}
        alt="YYCTrack Logo"
        className="h-14 object-contain"
      />
      </Link>

      {/* Right side of Header (navigation) */}
      <nav className="flex items-center gap-10 text-[15px] font-medium">

        <NavLink
          to="/"
          className={({ isActive }) => 
          `hover:opacity-80 transition ${
            isActive ? "underline underline-offset-4" : ""
          }`
        }
      >
        Home
      </NavLink>

      <NavLink
          to="/map"
          className={({ isActive }) => 
          `hover:opacity-80 transition ${
            isActive ? "underline underline-offset-4" : ""
          }`
        }
      >
        Map
      </NavLink>

      <NavLink
          to="/stations"
          className={({ isActive }) => 
          `hover:opacity-80 transition ${
            isActive ? "underline underline-offset-4" : ""
          }`
        }
      >
        Stations
      </NavLink>

      {/* feedback which is only visible when logged in */}
      {isLoggedIn && (
        <NavLink
          to="/feedback"
          className={({ isActive }) => 
            `hover:opacity-80 transition ${
              isActive ? "underline underline-offset-4" : ""
            }`
          }
        >
          Feedback
        </NavLink>
      )}

      {/* Most right part (login or profile) */}
      {!isLoggedIn ? (
        <Link
          to="/login"
          className="px-4 py-2 rounded-md border border-white/70 hover:bg-white hover:text-[#BC0B2A] transition"
        >
          Login
        </Link>
      ) : (
        // logged in: profile icon + dropdown
        <div className="relative" ref={dropdownRef}>
          {/* Profile icon button */}
          <button
            type="button"
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            className="flex items-center gap-2 focus:outline-none"
          >
            {/* Profile Picture if exists else Profile Icon */}
            <img
              src={user.profilePicture || profileIcon}
              className="w-9 h-9 rounded-full hover:opacity-80 transition"
              alt="Profile"
            />

            {/* Dropdown Arrow */}
            <svg 
              className={`w-4 h-4 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
              fill="none"
              stroke="white"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-3 w-48 bg-white text-black rounded-lg shadow-lg p-2 z-50 border border-gray-200">
              
              {/* User name */}
              <div className="px-3 py-2 border-b border-gray-200">
                <p className="text-sm font-semibold text-gray-800">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {user.email}
                </p>
              </div>
              
              {/* Account Settings Link */}
              <Link
                to="/account-settings"
                className="block px-3 py-2 hover:bg-gray-100 rounded-md text-sm"
              >
                Account Settings
              </Link>

              {/* Logout Button */}
              <button
                type="button"
                onClick={handleLogout} 
                className="block w-full text-left px-3 py-2 hover:bg-gray-100 rounded-md text-sm text-red-600"
              >
                Logout
              </button>
            </div>
          )}  
        </div>
      )}
      </nav>
    </header>
  );
};

export default Header; 