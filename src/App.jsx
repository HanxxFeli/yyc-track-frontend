// page imports (these are placeholder components for now)
// NOTE FOR ENO: Make sure your page component names match exactly
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VerifyEmail from "./pages/VerifyEmail";
import AccountSettings from "./pages/AccountSettings";
import ErrorPage from "./pages/ErrorPage";
import AccountDeleted from "./pages/AccountDeleted";
import AuthLandingPage from "./pages/AuthLandingPage";
import AuthCallback from "./pages/AuthCallback";
import CompleteProfile from "./pages/CompleteProfile";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import FeedbackPage from "./pages/FeedbackPage";

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

// Main App - simplified so that it is easier to manage router and auth provider
const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent /> {/* app content that contains all the routes */}
      </AuthProvider>
    </BrowserRouter>
  );
};

// App Content will contain the app structure
const AppContent = () => {
  return (
    // Outer container: full height, flex column to push footer down
    <div className="min-h-screen flex flex-col bg-[#F5F6F7]">
      
      {/* Global header - fixed on mobile for better UX */}
      <Header />

      {/* Main content area: flex-grow pushes footer to bottom, NO PADDING for Home/Map page */}
      <main className="flex-grow">
        {/* Container to prevent content from getting too wide on large screens */}
        <div className="h-full">
          <Routes>
            {/* public pages */}
            <Route path="/" element={<Home />} />
            <Route path="/map" element={<Home />} />
            <Route path="/stations" element={<Home />} />

            {/* User Login and Registration pages */}
            <Route path="/login" element={<div className="px-4 sm:px-6 lg:px-10 py-4 sm:py-6 lg:py-10"><Login /></div>} />
            <Route path="/register" element={<div className="px-4 sm:px-6 lg:px-10 py-4 sm:py-6 lg:py-10"><Register /></div>} />
            <Route path="/verify-email" element={<div className="px-4 sm:px-6 lg:px-10 py-4 sm:py-6 lg:py-10"><VerifyEmail /></div>} />
            <Route path="/forgot-password" element={<div className="px-4 sm:px-6 lg:px-10 py-4 sm:py-6 lg:py-10"><ForgotPassword /></div>} />
            <Route path="/reset-password/:token" element={<div className="px-4 sm:px-6 lg:px-10 py-4 sm:py-6 lg:py-10"><ResetPassword /></div>} />

            {/* OAuth routes */}
            <Route path="/auth/callback" element={<div className="px-4 sm:px-6 lg:px-10 py-4 sm:py-6 lg:py-10"><AuthCallback /></div>} />
            <Route path="/complete-profile" element={<div className="px-4 sm:px-6 lg:px-10 py-4 sm:py-6 lg:py-10"><CompleteProfile /></div>} />

            {/* Protected routes - wrap with ProtectedRoute */}
            <Route
              path="/account-settings"
              element={
                <ProtectedRoute>
                  <div className="px-4 sm:px-6 lg:px-10 py-4 sm:py-6 lg:py-10">
                    <AccountSettings />
                  </div>
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <div className="px-4 sm:px-6 lg:px-10 py-4 sm:py-6 lg:py-10">
                    <AuthLandingPage />
                  </div>
                </ProtectedRoute>
              }
            />
            <Route
              path="/feedback"
              element={
                <ProtectedRoute>
                  <div className="px-4 sm:px-6 lg:px-10 py-4 sm:py-6 lg:py-10">
                    <FeedbackPage />
                  </div>
                </ProtectedRoute>
              }
            />
            <Route path="/account-deleted" element={<div className="px-4 sm:px-6 lg:px-10 py-4 sm:py-6 lg:py-10"><AccountDeleted /></div>} />

            {/* 404 catch-all route - must be last */}
            <Route path="*" element={<div className="px-4 sm:px-6 lg:px-10 py-4 sm:py-6 lg:py-10"><ErrorPage /></div>} />
          </Routes>
        </div>
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
};

export default App;