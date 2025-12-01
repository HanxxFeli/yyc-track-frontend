import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import "./index.css";
import Header from './components/Header';

/**
 * App Component
 * 
 * Root component that:
 * - Initializes the React Router system
 * - Renders the global header on all page
 * - Defines all client-side routes 
 * - Handles temporary login detection (localStorage) before backend integration
 * - `isLoggedIn` will be replaced with real authentication
 */

// temporary login check
// for now it is simulated by checking if a token exists in local storage (will be replaced with real backend authentication)
const isLoggedIn = !!localStorage.getItem("token");

// page imports
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AccountSettings from "./pages/AccountSettings";

function App() {
  return (
    <Router>
      {/* Global header */}
      <Header isLoggedIn={isLoggedIn}/>

      {/* main content area where the page is displayed */}
      <main className="px-10 py-6">

        <Routes>
          {/* public pages */}
          <Route path="/" element={<Home />} />
          <Route path="/map" element={<Home />} /> {/* placeholder */}
          <Route path="/stations" element={<Home />} /> {/* placeholder */}

          {/* auth pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* account settings */}
          <Route path="/account-settings" element={<AccountSettings />} />
          <Route path="/feedback" element={<Home />} /> {/* placeholder */}
        </Routes>
        
      </main>
    </Router>
  );
}

export default App;