import { useNavigate } from "react-router-dom";
import StationCard from "../components/StationCard";
import { useMemo, useState } from "react";

const MOCK_STATIONS = [
  {
    id: "69th-street",
    name: "69th Street",
    line: "Blue Line",
    imageUrl: "https://picsum.photos/300/200?random=21",
    overallScore: 85,
    scores: { cleanliness: 81, safety: 82, accessibility: 80, crowding: 76 },
    updatedAt: "2026-02-08T18:30:00Z",
  },
  {
    id: "banff-trail",
    name: "Banff Trail",
    line: "Red Line",
    imageUrl: "https://picsum.photos/300/200?random=22",
    overallScore: 74,
    scores: { cleanliness: 79, safety: 74, accessibility: 82, crowding: 72 },
    updatedAt: "2026-01-29T12:00:00Z",
  },
  {
    id: "brentwood",
    name: "Brentwood",
    line: "Red Line",
    imageUrl: "https://picsum.photos/300/200?random=23",
    overallScore: 86,
    scores: { cleanliness: 90, safety: 85, accessibility: 88, crowding: 80 },
    updatedAt: "2026-02-10T09:10:00Z",
  },
  {
    id: "city-hall",
    name: "City Hall",
    line: "Dual Line",
    imageUrl: "https://picsum.photos/300/200?random=24",
    overallScore: 59,
    scores: { cleanliness: 60, safety: 58, accessibility: 70, crowding: 55 },
    updatedAt: "2025-12-15T08:00:00Z",
  },
];

export default function Stations() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [condition, setCondition] = useState("all"); // all|good|moderate|poor
  const [line, setLine] = useState("all"); // all|Red Line|Blue Line|Dual Line
  const [timeWindow, setTimeWindow] = useState("all"); // all|24h|7d|30d
  const [sortBy, setSortBy] = useState("recent"); // recent|oldest


  function getConditionKey(score) {
  if (score >= 80) return "good";
  if (score >= 60) return "moderate";
  return "poor";
}

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


const filteredStations = useMemo(() => {
  return MOCK_STATIONS
    .filter((s) =>
      s.name.toLowerCase().includes(search.trim().toLowerCase())
    )
    .filter((s) => (line === "all" ? true : s.line === line))
    .filter((s) =>
      condition === "all" ? true : getConditionKey(s.overallScore) === condition
    )
    .filter((s) => withinWindow(parseDateMs(s.updatedAt), timeWindow))
    .sort((a, b) => {
      const aT = parseDateMs(a.updatedAt);
      const bT = parseDateMs(b.updatedAt);
      return sortBy === "recent" ? bT - aT : aT - bT;
    });
}, [search, line, condition, timeWindow, sortBy]);


  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">CTrain Stations</h1>
      <p className="text-sm text-gray-500 mt-1">
        Browse the list of CTrain stations and view their CEI ratings.
      </p>

      {/* Filters (UI only for now) */}
      <div className="mt-6 bg-white border border-gray-200 rounded-xl p-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex-1 flex flex-col md:flex-row md:items-center gap-3">
          <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search by station name..."
            className="w-full md:max-w-sm border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#BC0B2A]"
          />

          <select 
           value={condition}
            onChange={(e) => setCondition(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white">
            <option>All Conditions</option>
            <option>Good</option>
            <option>Moderate</option>
            <option>Poor</option>
          </select>

          <select 
          value={line}
        onChange={(e) => setLine(e.target.value)}
        className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white">
            <option>All Lines</option>
            <option>Red Line</option>
            <option>Blue Line</option>
            <option>Dual Line</option>
          </select>

          <select
         value={timeWindow}
        onChange={(e) => setTimeWindow(e.target.value)}
        className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white"
>
        <option value="all">All time</option>
        <option value="24h">Last 24 hours</option>
         <option value="7d">Last 7 days</option>
        <option value="30d">Last 30 days</option>
        </select>

        <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white"
>
         <option value="recent">Most recent</option>
        <option value="oldest">Oldest first</option>
        </select>
        </div>

        <button
          type="button"
        onClick={() => {
        setSearch("");
        setCondition("all");
        setLine("all");
        setTimeWindow("all");
        setSortBy("recent");
  }}
          className="self-start md:self-auto text-xs font-semibold text-[#BC0B2A] border border-[#BC0B2A] px-3 py-2 rounded-lg hover:bg-red-50 transition"
        >
          Clear Filters
        </button>
      </div>

      {/* Station Cards */}
      <div className="mt-5 space-y-4">
        {filteredStations.map((station) => (
        <StationCard
        key={station.id}
        station={station}
        onViewDetails={(id) => navigate(`/stations/${id}`)}
          />
        ))}
      </div>
    </div>
  );
}