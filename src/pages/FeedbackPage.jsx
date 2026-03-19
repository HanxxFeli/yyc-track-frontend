import { useState } from "react";
import { FiSearch, FiFileText } from "react-icons/fi";
import PrimaryButton from "../components/buttons/PrimaryButton";
import SecondaryButton from "../components/buttons/SecondaryButton";
import ErrorMessage from "../components/common/ErrorMessage";
import SuccessMessage from "../components/common/SuccessMessage";
import ScoreInput from "../components/feedback/ScoreInput";
import HistoryRow from "../components/feedback/HistoryRow";

// List of Calgary CTrain stations for the dropdown
const STATIONS = [
  "Brentwood Station",
  "City Hall Station",
  "Chinook Station",
  "Marlborough Station",
  "Dalhousie Station",
  "Tuscany Station",
  "Somerset-Bridlewood Station",
  "Anderson Station",
];

// Four rating categories users can score (0-100)
const SCORE_FIELDS = [
  { key: "cleanliness", label: "Cleanliness" },
  { key: "safety", label: "Safety" },
  { key: "accessibility", label: "Accessibility" },
  { key: "crowding", label: "Crowding" },
];

const MAX_COMMENT = 1000; // Character limit for feedback comments

// Mock feedback entries to populate history on initial load
const INITIAL_HISTORY = [
  {
    id: 1,
    station: "Brentwood Station",
    comment: "Very clean station, but gets packed after 5pm.",
    cleanliness: 90, safety: 85, accessibility: 88, crowding: 70, overall: 83,
    date: "2 days ago",
  },
  {
    id: 2,
    station: "City Hall Station",
    comment: "Always super busy during rush hour, but it's convenient for downtown access. Could use more security presence at night though.",
    cleanliness: 78, safety: 68, accessibility: 86, crowding: 65, overall: 74,
    date: "6 days ago",
  },
  {
    id: 3,
    station: "Chinook Station",
    comment: "Clean and well-lit, but parking can be chaos during the weekends near Chinook Mall.",
    cleanliness: 85, safety: 82, accessibility: 80, crowding: 68, overall: 79,
    date: "2 weeks ago",
  },
  {
    id: 4,
    station: "Marlborough Station",
    comment: "Not the safest feeling place at night, but it's okay during the day. Needs more cleaning and lighting.",
    cleanliness: 70, safety: 62, accessibility: 78, crowding: 75, overall: 71,
    date: "2 weeks ago",
  },
  {
    id: 5,
    station: "Dalhousie Station",
    comment: "Always clean and quiet. Feels super safe even in the evenings. One of the better stations for sure.",
    cleanliness: 92, safety: 90, accessibility: 85, crowding: 82, overall: 87,
    date: "3 weeks ago",
  },
];

// Returns true if a score string is a valid 0–100 number
const isValidScore = (val) => {
  const n = Number(val);
  return val !== "" && !isNaN(n) && n >= 0 && n <= 100;
};

// Averages the four scores; returns null if any field is still empty
const computeOverall = (scores) => {
  const vals = Object.values(scores);
  if (vals.some((v) => v === "")) return null;
  return Math.round(vals.reduce((sum, v) => sum + Number(v), 0) / vals.length);
};

const FeedbackPage = () => {
  // Selected station from dropdown
  const [station, setStation] = useState(STATIONS[0]);
  
  // Four category scores (each is a string: "" or "0" to "100")
  const [scores, setScores] = useState({ 
    cleanliness: "", 
    safety: "", 
    accessibility: "", 
    crowding: "" 
  });
  
  // User's written feedback
  const [comment, setComment] = useState("");
  
  // Loading state during form submission
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Error/success messages shown after submit
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // List of all feedback submissions
  const [history, setHistory] = useState(INITIAL_HISTORY);
  
  // Filter string for searching history by station name
  const [searchQuery, setSearchQuery] = useState("");

  // Computed overall score (average of 4 categories)
  const overall = computeOverall(scores);
  
  // Helper to update a single score field
  const setScore = (key) => (val) => setScores((prev) => ({ ...prev, [key]: val }));

  // Validate inputs then add entry to history
  const handleSubmit = async () => {
    setErrorMsg("");
    setSuccessMsg("");

    // Check if all scores are valid numbers between 0-100
    const invalidScores = SCORE_FIELDS.filter(({ key }) => !isValidScore(scores[key]));
    if (invalidScores.length) {
      setErrorMsg("Please ensure all category scores are numbers between 0 and 100.");
      return;
    }
    
    // Check character limit on comment
    if (comment.length > MAX_COMMENT) {
      setErrorMsg(`Your comment exceeds the ${MAX_COMMENT}-character limit. Please shorten your feedback.`);
      return;
    }

    // Simulated async submit (replace with actual API call)
    setIsSubmitting(true);
    await new Promise((res) => setTimeout(res, 800));
    setIsSubmitting(false);

    // Add new entry to top of history
    setHistory((prev) => [
      {
        id: Date.now(), // Unique ID based on timestamp
        station,
        comment,
        ...Object.fromEntries(SCORE_FIELDS.map(({ key }) => [key, Number(scores[key])])),
        overall: overall ?? 0,
        date: "Just now",
      },
      ...prev,
    ]);

    setSuccessMsg("Your feedback has been submitted successfully!");
    
    // Reset form fields
    setScores({ cleanliness: "", safety: "", accessibility: "", crowding: "" });
    setComment("");

    // Auto-dismiss success message after 4 seconds
    setTimeout(() => setSuccessMsg(""), 4000);
  };

  // Reset all form fields and messages
  const handleClear = () => {
    setScores({ cleanliness: "", safety: "", accessibility: "", crowding: "" });
    setComment("");
    setErrorMsg("");
    setSuccessMsg("");
  };

  // Update comment text for a specific history entry
  const handleEdit = (id, newComment) =>
    setHistory((prev) => prev.map((f) => (f.id === id ? { ...f, comment: newComment } : f)));

  // Remove a history entry by ID
  const handleDelete = (id) =>
    setHistory((prev) => prev.filter((f) => f.id !== id));

  // Filter history based on station name search query
  const filteredHistory = history.filter((f) =>
    f.station.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    // Main container with responsive padding and max-width
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
        
        {/* Page header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Station Feedback</h1>
          <p className="text-sm sm:text-base text-gray-600">Share your experience and help improve Calgary Transit</p>
        </div>

        <div className="space-y-6 sm:space-y-8">

          {/* FEEDBACK FORM SECTION */}
          <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200">
            <div className="p-4 sm:p-6 lg:p-8">
              
              {/* Form title */}
              <div className="mb-6">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">Share Your Feedback</h2>
                <p className="text-sm text-gray-500">Rate and review a CTrain station</p>
              </div>

              {/* Main form layout: responsive grid */}
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">

                {/* LEFT SIDE: Form inputs (takes 2 cols on xl screens) */}
                <div className="xl:col-span-2 space-y-6">

                  {/* Station selector - full width */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Station
                    </label>
                    <select
                      value={station}
                      onChange={(e) => setStation(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#BC0B2A] focus:border-transparent transition"
                    >
                      {STATIONS.map((s) => <option key={s}>{s}</option>)}
                    </select>
                  </div>

                  {/* Score inputs grid: 2 cols on mobile, 4 cols on desktop */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Rate Each Category (0-100)
                    </label>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                      {SCORE_FIELDS.map(({ key, label }) => (
                        <ScoreInput
                          key={key}
                          label={label}
                          value={scores[key]}
                          onChange={setScore(key)}
                          invalid={scores[key] !== "" && !isValidScore(scores[key])}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Comment textarea */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Comments
                    </label>
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      rows={5}
                      placeholder="Describe your experience at this station..."
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#BC0B2A] focus:border-transparent transition"
                    />
                    {/* Character counter */}
                    <div className={`text-right text-xs mt-1.5 ${comment.length > MAX_COMMENT ? "text-red-500 font-medium" : "text-gray-500"}`}>
                      {comment.length} / {MAX_COMMENT}
                    </div>
                  </div>

                  {/* Action buttons: stack on mobile, inline on desktop */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <div className="flex-1 sm:flex-initial sm:w-44">
                      <PrimaryButton
                        onClick={handleSubmit}
                        isLoading={isSubmitting}
                        loadingText="Submitting..."
                      >
                        Submit Feedback
                      </PrimaryButton>
                    </div>
                    <div className="flex-1 sm:flex-initial sm:w-32">
                      <SecondaryButton onClick={handleClear} disabled={isSubmitting}>
                        Clear
                      </SecondaryButton>
                    </div>
                  </div>

                </div>

                {/* RIGHT SIDE: Overall score + messages */}
                <div className="xl:col-span-1">
                  <div className="bg-gray-50 rounded-lg p-6 space-y-4 border border-gray-200">
                    
                    {/* Overall CFI Score display */}
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-600 mb-2">Overall CFI Score</p>
                      <div className="text-5xl sm:text-6xl font-bold text-gray-900 mb-1">
                        {overall !== null ? overall : "—"}
                      </div>
                      <p className="text-xs text-gray-500">out of 100</p>
                    </div>

                    {/* Divider */}
                    {(errorMsg || successMsg) && <div className="border-t border-gray-300" />}

                    {/* Error and success messages */}
                    <div className="space-y-3">
                      <ErrorMessage message={errorMsg} />
                      <SuccessMessage message={successMsg} />
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* FEEDBACK HISTORY SECTION */}
          <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200">
            <div className="p-4 sm:p-6 lg:p-8">
              
              {/* Header with search */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">Feedback History</h2>
                  <p className="text-sm text-gray-500">View and manage your submissions</p>
                </div>

                {/* Search input with react-icons */}
                <div className="relative w-full sm:w-64">
                  <input
                    type="text"
                    placeholder="Search stations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-[#BC0B2A] focus:border-transparent transition"
                  />
                  {/* Search icon from react-icons */}
                  <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                </div>
              </div>

              {/* Desktop table headers */}
              <div className="hidden lg:grid lg:grid-cols-[2fr_3fr_1fr_100px] gap-4 px-4 pb-3 mb-4 border-b border-gray-200">
                <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Station</span>
                <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Feedback</span>
                <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Date</span>
                <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Actions</span>
              </div>

              {/* History list */}
              <div className="space-y-3 lg:space-y-2">
                {filteredHistory.length === 0 ? (
                  // Empty state with react-icons
                  <div className="text-center py-12">
                    <FiFileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-sm text-gray-500 mb-1">No feedback found</p>
                    <p className="text-xs text-gray-400">Try adjusting your search or submit new feedback</p>
                  </div>
                ) : (
                  // Render history rows
                  filteredHistory.map((entry) => (
                    <HistoryRow
                      key={entry.id}
                      entry={entry}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                    />
                  ))
                )}
              </div>

              {/* View All button */}
              {filteredHistory.length > 0 && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="w-full sm:w-auto sm:inline-block">
                    <PrimaryButton onClick={() => console.log("View all clicked")}>
                      View All Feedback
                    </PrimaryButton>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;