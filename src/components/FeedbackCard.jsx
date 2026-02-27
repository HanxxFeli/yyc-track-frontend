import PropTypes from "prop-types";

export default function FeedbackCard({ feedback }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-gray-900 truncate">
          {feedback.authorName}
        </p>
        <p className="text-xs text-gray-500 flex-shrink-0">
          {feedback.createdAtLabel}
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
    createdAtLabel: PropTypes.string.isRequired,
  }).isRequired,
};