// page imports (these are placeholder components for now)
// NOTE FOR ENO: Make sure your page component names match exactly
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VerifyEmail from "./pages/VerifyEmail";
import AccountSettings from "./pages/AccountSettings";
import ErrorPage from "./pages/ErrorPage";
import AccountDeleted from './pages/AccountDeleted';
import AuthLandingPage from './pages/AuthLandingPage';
import AuthCallback from './pages/AuthCallback';
import CompleteProfile from './pages/CompleteProfile'
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import AdminLogin from './pages/AdminLogin';

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
        <AppContent /> {/*app content that contains all the routes */}
      </AuthProvider>
    </BrowserRouter>
  );
};

// App Content will contain the app structure 
const AppContent = () => {

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F6F7]">
      {/* Global header */}
      <Header />

      {/* main content area where the page is displayed */}
      <main className="flex-grow px-10 py-10">
        <Routes>
          {/* public pages */}
          <Route path="/" element={<Home />} />
          <Route path="/map" element={<Home />} />
          <Route path="/stations" element={<Home />} />
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* User Login and Registration pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          {/* OAuth routes */}
          <Route path='/auth/callback' element={<AuthCallback />} />
          <Route path='/complete-profile' element={<CompleteProfile />} />
          
          {/* Protected routes - wrap with ProtectedRoute */}
          <Route 
            path="/account-settings" 
            element={
              <ProtectedRoute>
                <AccountSettings />
              </ProtectedRoute>
            } 
          />
          <Route 
            path='/dashboard' 
            element={
              <ProtectedRoute>
                <AuthLandingPage />
              </ProtectedRoute>
            } 
          />
          <Route path="/feedback" element={<Home />} />
          <Route path="/account-deleted" element={<AccountDeleted />} /> 
            
          {/* 404 catch-all route - must be last */}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
};

export default App;