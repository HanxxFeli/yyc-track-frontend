import { Link } from "react-router-dom";

/**
 * Account Deleted Confirmation Page
 *
 * Shown after the user successfully deletes their account.
 * Contains:
 * - Warning icon
 * - Confirmation message
 * - Button to return to homepage
 */

const AccountDeleted = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-[#F5F6F7] px-6 pt-32">

      {/* title */}
      <h1 className="text-2xl font-semibold mb-2">
        Your account has been deleted
      </h1>

      {/* description */}
      <p className="text-gray-600 max-w-md text-center mb-8">
        Your account and all related data have been permanently removed.
        We're sorry to see you go.
      </p>

      {/* back to home */}
      <Link
        to="/"
        className="
          px-6 py-2 
          bg-[#BC0B2A] 
          text-white 
          rounded-md 
          text-sm 
          hover:bg-[#A30A26] 
          transition
        "
      >
        Return to Homepage
      </Link>

    </div>
  );
};

export default AccountDeleted;
