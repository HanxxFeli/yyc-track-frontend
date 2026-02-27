import { useParams } from "react-router-dom";
import FeedbackCard from "../components/FeedbackCard";

export default function StationDetails() {
  const { id } = useParams();

  const stationName =
    id?.split("-").map(w => w[0].toUpperCase() + w.slice(1)).join(" ") ||
    "Station";

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
        <h2 className="text-lg font-semibold text-gray-900">
          Recent Feedback
        </h2>

        <div className="mt-4 space-y-4">
          <FeedbackCard
            feedback={{
              authorName: "Anonymous",
              comment: "Very clean station, but gets packed after 5pm.",
              createdAtLabel: "2 days ago",
            }}
          />
          <FeedbackCard
            feedback={{
              authorName: "CalgaryCommuter",
              comment:
                "Love that it connects to the bus loop right away. Feels efficient and safe overall.",
              createdAtLabel: "4 days ago",
            }}
          />
          <FeedbackCard
            feedback={{
              authorName: "TransitLover",
              comment:
                "The elevator has been down a few times lately. Makes it hard for people with strollers or mobility issues.",
              createdAtLabel: "1 week ago",
            }}
          />
        </div>

        <button className="mt-6 bg-[#BC0B2A] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#9a0922] transition">
          Load More
        </button>
      </div>

    </div>
  );
}