import { useMemo, useState } from 'react';
import FilterBar from '../components/FilterBar';
import FeedbackToReviewTable from '../components/admin/FeedbackToReviewTable';
import FeedbackArchive from '../components/admin/FeedbackArchive';
import { MOCK_FEEDBACK, MOCK_STATION_OPTIONS } from '../mockFeedbackData';

/**
 * Configuration for the filter bar controls used on the feedback
 * 
 * Includes:
 * - Search input for keyword filtering
 * - Station dropdown for filtering by station
 * - Status dropdown for filtering by moderation status
 * - Sort dropdown for sorting by date or station name
 */
const feedbackFilters = [
  { 
    type: "search", 
    key: "query", 
    placeholder: "Search by station name, user, or keyword..." },
  {
    type: "select",
    key: "station",
    label: "All Stations",
    options: MOCK_STATION_OPTIONS.map((station) => ({
      value: station,
      label: station,
    })),
  },
  {
    type: "select",
    key: "status",
    label: "Status",
    options: [{ value: "needs_review", label: "Needs Review"}],
  },
  {
    type: "select",
    key: "sort",
    label: "Sort By",
    options: [
      { value: "newest", label: "Newest First" },
      { value: "oldest", label: "Oldest First" },
      { value: "station_asc", label: "Station Name (A-Z)" },
    ],
  },
];

/**
 * FeedbackManagement Page
 * 
 * - Main page for the feedback management system
 * - Manages:
 *  - feedback state (needs review, approved, rejected)
 *  - filter state for searching and sorting feedback
 *  - filtering and sorting logic
 *  - moderation actions (approval and rejection actions)
 * 
 * Child components used:
 * - FilterBar: for rendering the search and filter controls
 * - FeedbackToReviewTable: for displaying feedback items that need review with action buttons
 * - FeedbackArchive: for displaying approved and rejected feedback in separate sections
 */
export default function FeedbackManagement() {
  // state for feedback waiting for review
  const [toReview, setToReview] = useState(MOCK_FEEDBACK);

  // state for approved feedback items
  const [approved, setApproved] = useState([]);

  // state for rejected feedback items
  const [rejected, setRejected] = useState([]);

  // state for active filter values
  const [filters, setFilters] = useState({
    query: "",
    station: "all",
    status: "needs_review",
    sort: "newest",
  });

  /**
   * Memoized filtered/sort feedback list
   * 
   * useMemo is used here to avoid recalculating the filtered list on every render, and only recalculate when the `toReview` list or `filters` change.
   */
  const filteredToReview = useMemo(() => {
    const q = filters.query.trim().toLowerCase();

    let data = [...toReview];

    /**
     * Filter by search query
     * Matches station name, user name, or feedback text
     */
    if (q) {
      data = data.filter((item) => {
        const searchableText =
          `${item.station} ${item.user} ${item.feedback}`.toLowerCase();
        return searchableText.includes(q);
      });
    }

    // filter by selected station
    if (filters.station !== "all") {
      data = data.filter((item) => item.station === filters.station);
    }

    // sort feedback alphabetically by station name
    if (filters.sort === "station_asc") {
      data.sort((a, b) => a.station.localeCompare(b.station));
    }
    
    // reverse order to simulate oldest-first sorting
    if (filters.sort === "oldest") {
      data = [...data].reverse();
    }

    return data;
  }, [toReview, filters]);

  // update a specific filter value when changed in the FilterBar component
  const onChange = (key, value) => 
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));

  // resets all filters to default values
  const onClear = () =>
    setFilters({
      query: "",
      station: "all",
      status: "needs_review",
      sort: "newest",
     });

  /**
   * Approves a feedback item by:
   * - finding it in the review list
   * - adding it to the approved archive
   * - removing it from the review list
   */
  const onApprove = (id) => {
    const selected = toReview.find((item) => item.id === id);
    if (!selected) return;

    setApproved((prev) => [selected, ...prev]);
    setToReview((prev) => prev.filter((item) => item.id !== id));
  };
  
  /**
   * Rejects a feedback item by:
   * - finding it in the review list
   * - adding it to the rejected archive
   * - removing it from the review list
   */
  const onReject = (id) => {
    const selected = toReview.find((item) => item.id === id);
    if (!selected) return;

    setRejected((prevRejected) => [selected, ...prevRejected]);
    setToReview((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">

      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">
          Feedback Management
        </h1>
        <p className="text-sm text-gray-600">
          Review, moderate, and archive user-submitted feedback.
        </p>
      </div>

      {/* Filter Controls */}
      <FilterBar
        filters={feedbackFilters}
        values={filters}
        onChange={onChange}
        onClear={onClear}
      />

      {/* Table of feedback items that needs review */}
      <FeedbackToReviewTable
        rows={filteredToReview}
        onApprove={onApprove}
        onReject={onReject}
      />

      {/* Archive section for approved and rejected feedback */}
      <FeedbackArchive 
        approved={approved} 
        rejected={rejected} 
      />
  </div>
  );
}