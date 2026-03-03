import { useState } from "react";

// Layout
import PrimaryButton from "../components/buttons/PrimaryButton";
import SecondaryButton from "../components/buttons/SecondaryButton";
import ErrorMessage from "../components/common/ErrorMessage";
import SuccessMessage from "../components/common/SuccessMessage";

// Feedback-specific components (add these to src/components/feedback/)
import ScoreInput from "../components/feedback/ScoreInput";
import HistoryRow from "../components/feedback/HistoryRow";

//dummy data


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

const SCORE_FIELDS = [
  { key: "cleanliness", label: "Cleanliness" },
  { key: "safety", label: "Safety" },
  { key: "accessibility", label: "Accessibility" },
  { key: "crowding", label: "Crowding" },
];

const MAX_COMMENT = 1000;

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

//Helpers

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

//Page
const FeedbackPage = () => {
  // Form state
  const [station, setStation] = useState(STATIONS[0]);
  const [scores, setScores] = useState({ cleanliness: "", safety: "", accessibility: "", crowding: "" });
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // History state
  const [history, setHistory] = useState(INITIAL_HISTORY);
  const [searchQuery, setSearchQuery] = useState("");

  const overall = computeOverall(scores);
  const setScore = (key) => (val) => setScores((prev) => ({ ...prev, [key]: val }));

  // Validate inputs then add entry to history
  const handleSubmit = async () => {
    setErrorMsg("");
    setSuccessMsg("");

    const invalidScores = SCORE_FIELDS.filter(({ key }) => !isValidScore(scores[key]));
    if (invalidScores.length) {
      setErrorMsg("Please ensure all category scores are numbers between 0 and 100.");
      return;
    }
    if (comment.length > MAX_COMMENT) {
      setErrorMsg(`Your comment exceeds the ${MAX_COMMENT}-character limit. Please shorten your feedback.`);
      return;
    }

    //simulated async submit
    setIsSubmitting(true);
    await new Promise((res) => setTimeout(res, 800));
    setIsSubmitting(false);

    setHistory((prev) => [
      {
        id: Date.now(),
        station,
        comment,
        ...Object.fromEntries(SCORE_FIELDS.map(({ key }) => [key, Number(scores[key])])),
        overall: overall ?? 0,
        date: "Just now",
      },
      ...prev,
    ]);

    setSuccessMsg("Your feedback has been submitted successfully!");
    setScores({ cleanliness: "", safety: "", accessibility: "", crowding: "" });
    setComment("");

    // Auto-dismiss success message after 4 seconds
    setTimeout(() => setSuccessMsg(""), 4000);
  };

  const handleClear = () => {
    setScores({ cleanliness: "", safety: "", accessibility: "", crowding: "" });
    setComment("");
    setErrorMsg("");
    setSuccessMsg("");
  };

  const handleEdit = (id, newComment) =>
    setHistory((prev) => prev.map((f) => (f.id === id ? { ...f, comment: newComment } : f)));

  const handleDelete = (id) =>
    setHistory((prev) => prev.filter((f) => f.id !== id));

  const filteredHistory = history.filter((f) =>
    f.station.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto w-full px-6 py-8 space-y-8">

      {/*Feedback Form*/}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h1 className="text-xl font-bold text-gray-900 mb-1">Share your Feedback</h1>
        <p className="text-sm text-gray-500 mb-5">
          Rate and review a CTrain station based on your recent experience.
        </p>

        <div className="flex flex-wrap gap-6 items-start">

          {/*station picker, scores, comment, buttons */}
          <div className="flex-1 min-w-72 space-y-4">

            {/* Station dropdown + score inputs */}
            <div className="flex flex-wrap items-end gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-500 font-medium">Select Station</label>
                <select
                  value={station}
                  onChange={(e) => setStation(e.target.value)}
                  className="border border-gray-300 rounded px-3 py-1.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#BC0B2A]"
                >
                  {STATIONS.map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>

              {/* One ScoreInput per category */}
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

            <p className="text-xs text-gray-400">Enter a score between 0–100 for each category.</p>

            {/* Comment box with live character counter */}
            <div>
              <label className="text-xs font-semibold text-[#BC0B2A] block mb-1">Comments</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={6}
                placeholder="Describe your experience at this station..."
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#BC0B2A] transition"
              />
              <div className={`text-right text-xs mt-0.5 ${comment.length > MAX_COMMENT ? "text-red-500" : "text-gray-400"}`}>
                {comment.length}/{MAX_COMMENT}
              </div>
            </div>

            {/* PrimaryButton = submit, SecondaryButton = clear */}
            <div className="flex gap-3">
              <div className="w-44">
                <PrimaryButton
                  onClick={handleSubmit}
                  isLoading={isSubmitting}
                  loadingText="Submitting..."
                >
                  Submit Feedback
                </PrimaryButton>
              </div>
              <div className="w-24">
                <SecondaryButton onClick={handleClear} disabled={isSubmitting}>
                  Clear
                </SecondaryButton>
              </div>
            </div>
          </div>

          {/*overall score + error/success messages */}
          <div className="w-64 space-y-3">
            <div>
              <p className="text-sm text-gray-500 font-medium mb-1">Overall CFI Score:</p>
              <div className="text-4xl font-bold text-gray-800">
                {overall !== null ? overall : "—"}
              </div>
            </div>

            <ErrorMessage message={errorMsg} />
            <SuccessMessage message={successMsg} />
          </div>
        </div>
      </div>

      {/*Feedback History*/}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">Feedback History</h2>

          {/*station name search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search by station name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border border-gray-300 rounded px-3 py-1.5 text-sm pl-8 w-60 focus:outline-none focus:ring-2 focus:ring-[#BC0B2A] transition"
            />
            <svg className="w-4 h-4 text-gray-400 absolute left-2 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 105 11a6 6 0 0012 0z" />
            </svg>
          </div>
        </div>

        {/*column headers*/}
        <div className="grid grid-cols-[1fr_2fr_auto] gap-4 text-xs font-semibold text-gray-500 uppercase border-b pb-2 mb-2">
          <span>Station</span>
          <span>Feedback</span>
          <span>Date</span>
        </div>

        {/*history rows */}
        {filteredHistory.length === 0 ? (
          <p className="text-sm text-gray-400 py-4 text-center">No feedback found.</p>
        ) : (
          filteredHistory.map((entry) => (
            <HistoryRow
              key={entry.id}
              entry={entry}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        )}

        {filteredHistory.length > 0 && (
          <div className="mt-4 w-32">
            <PrimaryButton onClick={() => {}}>View All</PrimaryButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedbackPage;