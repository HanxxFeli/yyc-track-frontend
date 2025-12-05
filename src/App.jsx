import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

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

// page imports (these are placeholder components for now)
// NOTE FOR ENO: Make sure your page component names match exactly
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AccountSettings from "./pages/AccountSettings";
import AccountDeleted from './pages/AccountDeleted';

const App = () => {
  // temporary login check
  // for now it is simulated by checking if a token exists in local storage (will be replaced with real backend authentication)
  const isLoggedIn = !!localStorage.getItem("token");
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-[#F5F6F7]">

        {/* Global header */}
        <Header isLoggedIn={isLoggedIn}/>

        {/* main content area where the page is displayed */}
        <main className="flex-grow px-10 py-10">

          <Routes>
            {/* public pages */}
            <Route path="/" element={<Home />} />
            {/* placeholder - NOTE: Create Map.jsx later */}
            <Route path="/map" element={<Home />} />
            {/* placeholder - NOTE: Create Stations.jsx later */}
            <Route path="/stations" element={<Home />} />

            {/* auth pages 
                NOTE FOR ENO: 
                Login.jsx and Register.jsx must match naming conventions */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* account settings */}
            <Route path="/account-settings" element={<AccountSettings />} />
            {/* placeholder - NOTE: Create Feedback.jsx later */}
            <Route path="/feedback" element={<Home />} />
            <Route path="/account-deleted" element={<AccountDeleted />} /> 
          </Routes>

        </main>

        {/* Global Footer */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;