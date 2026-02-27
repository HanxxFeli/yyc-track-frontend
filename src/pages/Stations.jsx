import { useNavigate } from "react-router-dom";
import StationCard from "../components/StationCard";

const MOCK_STATIONS = [
  {
    id: "69th-street",
    name: "69th Street",
    line: "Blue Line",
    imageUrl: "https://picsum.photos/300/200?random=21",
    overallScore: 85,
    scores: { cleanliness: 81, safety: 82, accessibility: 80, crowding: 76 },
  },
  {
    id: "banff-trail",
    name: "Banff Trail",
    line: "Red Line",
    imageUrl: "https://picsum.photos/300/200?random=22",
    overallScore: 74,
    scores: { cleanliness: 79, safety: 74, accessibility: 82, crowding: 72 },
  },
  {
    id: "brentwood",
    name: "Brentwood",
    line: "Red Line",
    imageUrl: "https://picsum.photos/300/200?random=23",
    overallScore: 86,
    scores: { cleanliness: 90, safety: 85, accessibility: 88, crowding: 80 },
  },
  {
    id: "city-hall",
    name: "City Hall",
    line: "Dual Line",
    imageUrl: "https://picsum.photos/300/200?random=24",
    overallScore: 59,
    scores: { cleanliness: 60, safety: 58, accessibility: 70, crowding: 55 },
  },
];

export default function Stations() {
  const navigate = useNavigate();

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
            type="text"
            placeholder="Search by station name..."
            className="w-full md:max-w-sm border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#BC0B2A]"
          />

          <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white">
            <option>All Conditions</option>
            <option>Good</option>
            <option>Moderate</option>
            <option>Poor</option>
          </select>

          <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white">
            <option>All Lines</option>
            <option>Red Line</option>
            <option>Blue Line</option>
            <option>Dual Line</option>
          </select>
        </div>

        <button
          type="button"
          className="self-start md:self-auto text-xs font-semibold text-[#BC0B2A] border border-[#BC0B2A] px-3 py-2 rounded-lg hover:bg-red-50 transition"
        >
          Clear Filters
        </button>
      </div>

      {/* Station Cards */}
      <div className="mt-5 space-y-4">
        {MOCK_STATIONS.map((station) => (
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