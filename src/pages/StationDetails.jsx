import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import FeedbackCard from "../components/FeedbackCard";

export default function StationDetails() {
  const { id } = useParams();

  const stationName =
    id?.split("-").map(w => w[0].toUpperCase() + w.slice(1)).join(" ") ||
    "Station";


    const feedback = [
  {
    id: "f1",
    authorName: "Anonymous",
    comment: "Very clean station, but gets packed after 5pm.",
    createdAt: "2026-02-10T18:30:00Z",
  },
  {
    id: "f2",
    authorName: "CalgaryCommuter",
    comment:
      "Love that it connects to the bus loop right away. Feels efficient and safe overall.",
    createdAt: "2026-02-08T12:00:00Z",
  },
  {
    id: "f3",
    authorName: "TransitLover",
    comment:
      "The elevator has been down a few times lately. Makes it hard for people with strollers or mobility issues.",
    createdAt: "2026-01-25T09:00:00Z",
  },
];

    const [timeWindow, setTimeWindow] = useState("all"); // all|24h|7d|30d
    const [sortBy, setSortBy] = useState("recent"); // recent|oldest

    function parseDateMs(v) {
  const t = new Date(v).getTime();
  return Number.isFinite(t) ? t : 0;
}

function withinWindow(timestampMs, windowKey) {
  if (windowKey === "all") return true;
  const now = Date.now();
  const ranges = {
    "24h": 24 * 60 * 60 * 1000,
    "7d": 7 * 24 * 60 * 60 * 1000,
    "30d": 30 * 24 * 60 * 60 * 1000,
  };
  return now - timestampMs <= ranges[windowKey];
}

const filteredFeedback = useMemo(() => {
  return [...feedback]
    .filter((f) => withinWindow(parseDateMs(f.createdAt), timeWindow))
    .sort((a, b) => {
      const aT = parseDateMs(a.createdAt);
      const bT = parseDateMs(b.createdAt);
      return sortBy === "recent" ? bT - aT : aT - bT;
    });
}, [feedback, timeWindow, sortBy]);

  return (
    <div className="max-w-6xl mx-auto">

      {/* Back Link */}
      <button
        onClick={() => window.history.back()}
        className="text-sm text-[#BC0B2A] mb-4 hover:underline"
      >
        ← Back to Map
      </button>

      {/* Station Header Row */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">
          {stationName} Station
        </h1>

        {/* Circular Overall Badge */}
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
          <span className="text-green-700 font-bold text-lg">86</span>
        </div>
      </div>

      {/* Score Cards */}
      <div className="mt-6 bg-white border rounded-xl shadow-sm p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">

          {[
            ["Cleanliness", 90],
            ["Crowding", 80],
            ["Accessibility", 88],
            ["Safety", 85],
          ].map(([label, value]) => (
            <div
              key={label}
              className="border rounded-lg py-4 px-3"
            >
              <p className="text-xs text-gray-500">{label}</p>
              <p className="text-green-600 font-semibold text-lg mt-1">
                {value}
              </p>
            </div>
          ))}

        </div>

        {/* Description Text */}
        <p className="text-sm text-gray-600 text-center mt-6">
          Highly rated for cleanliness and safety. Moderate crowding during rush hour, generally positive commuter experience.
        </p>
      </div>

     {/* Recent Feedback */}
<div className="mt-10">
  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
    <h2 className="text-lg font-semibold text-gray-900">Recent Feedback</h2>

    {/* Filters (time + recency) */}
    <div className="flex flex-col sm:flex-row gap-3">
      <select
        value={timeWindow}
        onChange={(e) => setTimeWindow(e.target.value)}
        className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#BC0B2A]"
      >
        <option value="all">All time</option>
        <option value="24h">Last 24 hours</option>
        <option value="7d">Last 7 days</option>
        <option value="30d">Last 30 days</option>
      </select>

      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#BC0B2A]"
      >
        <option value="recent">Most recent</option>
        <option value="oldest">Oldest first</option>
      </select>
    </div>
  </div>

  {/* Feedback list */}
  <div className="mt-4 space-y-4">
    {filteredFeedback.length === 0 ? (
      <div className="bg-white border border-gray-200 rounded-xl p-4 text-sm text-gray-600">
        No feedback found for the selected time range.
      </div>
    ) : 
    (
      filteredFeedback.map((item) => (
        <FeedbackCard key={item.id} feedback={item} />
      ))
    )}
  </div>
  <button className="mt-6 bg-[#BC0B2A] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#9a0922] transition">
    Load More
  </button>
    </div>
    </div>
  );
}