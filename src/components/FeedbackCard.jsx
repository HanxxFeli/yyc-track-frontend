import PropTypes from "prop-types";

function formatRelative(iso) {
  const t = new Date(iso).getTime();
  if (!Number.isFinite(t)) return "";

  const diff = Date.now() - t;
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins} min ago`;

  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hr${hrs === 1 ? "" : "s"} ago`;

  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days} day${days === 1 ? "" : "s"} ago`;

  const weeks = Math.floor(days / 7);
  return `${weeks} week${weeks === 1 ? "" : "s"} ago`;
}

export default function FeedbackCard({ feedback }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-gray-900 truncate">
          {feedback.authorName}
        </p>
        <p className="text-xs text-gray-500 flex-shrink-0">
          {formatRelative(feedback.createdAt)}
        </p>
      </div>

      <p className="text-sm text-gray-700 mt-2 leading-relaxed">
        “{feedback.comment}”
      </p>
    </div>
  );
}

FeedbackCard.propTypes = {
  feedback: PropTypes.shape({
    authorName: PropTypes.string.isRequired,
    comment: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired, // ISO date string
  }).isRequired,
};