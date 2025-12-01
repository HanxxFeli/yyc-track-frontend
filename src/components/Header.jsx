import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo-white.png";
import profileIcon from "../assets/profile-icon.png";

/**
 * Header Component
 * 
 * A reusable navigation header that displays:
 * - Logo 
 * - Navigation links
 * - Feedback links (only visible when logged in)
 * - Login button when logged out, OR profile icon when logged in.
 * 
 * Props:
 * - isLoggedIn (boolean): determines which UI to display.
 */

const Header = ({ isLoggedIn = false }) => {
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
        <Link
          to="/account-settings">
            <img
              src={profileIcon}
              className="w-9 h-9 rounded-full"
              alt="Profile"
            />
          </Link>
      )}
      </nav>
    </header>
  );
};

export default Header; 