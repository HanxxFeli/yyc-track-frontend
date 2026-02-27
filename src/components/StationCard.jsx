import PropTypes from "prop-types";

function getCondition(score) {
  if (score >= 80) return { label: "Good Condition", dot: "bg-green-600" };
  if (score >= 60) return { label: "Moderate Condition", dot: "bg-yellow-500" };
  return { label: "Poor Condition", dot: "bg-red-600" };
}

export default function StationCard({ station, onViewDetails }) {
  const condition = getCondition(station.overallScore);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex gap-4">
      {/* Image */}
      <div className="w-32 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
        <img
          src={station.imageUrl}
          alt={`${station.name} station`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="text-base font-semibold text-gray-900 truncate">
              {station.name}
            </h3>

            <p className="text-xs text-blue-600 font-medium mt-0.5">
              {station.line}
            </p>

            <p className="text-xs text-gray-600 mt-1">
              <span className="font-medium text-gray-800">
                Overall Score: {station.overallScore}
              </span>
            </p>

            <p className="text-xs text-gray-500 mt-1">
              Cleanliness: {station.scores.cleanliness} | Safety:{" "}
              {station.scores.safety} | Accessibility:{" "}
              {station.scores.accessibility} | Crowding:{" "}
              {station.scores.crowding}
            </p>
          </div>

          {/* Condition + Button */}
          <div className="flex flex-col items-end gap-3">
            {/* CONDITION BADGE (dot style matches mockup) */}
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-700">
              <span
                className={`w-2.5 h-2.5 rounded-full ${condition.dot} shadow-[0_0_0_2px_rgba(255,255,255,0.6)]`}
              />
              <span>{condition.label}</span>
            </div>

            <button
              type="button"
              onClick={() => onViewDetails(station.id)}
              className="text-[#BC0B2A] border border-[#BC0B2A] rounded-md px-3 py-1.5 text-xs font-semibold hover:bg-red-50 transition"
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

StationCard.propTypes = {
  station: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    line: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    overallScore: PropTypes.number.isRequired,
    scores: PropTypes.shape({
      cleanliness: PropTypes.number.isRequired,
      safety: PropTypes.number.isRequired,
      accessibility: PropTypes.number.isRequired,
      crowding: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  onViewDetails: PropTypes.func.isRequired,
};