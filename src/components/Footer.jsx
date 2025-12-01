import { Link } from "react-router-dom";

/**
 * Footer Component
 * 
 * A reusable footer that shows:
 * - Copyright
 * - Quick links to: Privacy Policy, Terms of Service, Contact
 * - Simple static footer for Phase 3
 * - No routing yet - future pages will be Privacy Policy, Terms of Service, Contact
 *    - Will be added later
 */

const Footer = () => {
  return (
    // main footer container
    <footer className="w-full bg-gray-100 text-gray-700 py-4 mt-10 border-t">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between text-sm">

      {/* left side of footer */}
      <p>© 2025 YYC Track</p>

      {/* right side of footer (nav links) */}
      <div className="flex items-center gap-6">
        <Link to="/privacy" className="hover:underline">
        Privacy Policy
        </Link>

        <span className="text-gray-400">|</span>

        <Link to="/terms" className="hover:underline">
        Terms of Service
        </Link>

        <span className="text-gray-400">|</span>

        <Link to="/contact" className="hover:underline">
        Contact 
        </Link>
      </div>
      </div>
    </footer>
  );
}

export default Footer;