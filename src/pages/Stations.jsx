/**
 * Stations List Page
 * 
 * - has mock data for now until backend integration
 * - reusable components
 * - react hooks
 */

import { useMemo, useState } from "react";
import FilterBar from "../components/FilterBar";
import StationCard from "../components/StationCard";
import { MOCK_STATIONS } from "../mockStations";

/**
 * Configuration object for FilterBar
 * 
 * - define a config array that tells FilterBar what controls to render
 * - makes FilterBar reusable across other pages
 */
const stationListFilters = [
  { 
    type: "search", 
    key: "query", 
    placeholder: "Search by station name..." 
  },
  {
    type: "select",
    key: "condition",
    label: "All Conditions",
    options: [
      { value: "good", label: "Good Condition" },
      { value: "moderate", label: "Moderate Condition" },
      { value: "poor", label: "Poor Condition" },
    ],
  },
  {
    type: "select",
    key: "line",
    label: "All Lines",
    options: [
      { value: "Red", label: "Red Line" },
      { value: "Blue", label: "Blue Line" },
      { value: "Dual", label: "Dual" },
    ],
  },
];

/**
 * Local State for Filters
 * 
 * object tracks:
 * - search query
 * - selected condition
 * - selected line
 */
export default function Stations() {
  const [filters, setFilters] = useState({
    query: "",
    condition: "all",
    line: "all",
  });

  /**
   * Memoized filtered stations list
   * - useMemo ensures that filtering only recalculates when filters change
   * - prevents unnecessary recalculation on every render
   */
  const filteredStations = useMemo(() => {
    // normalize query for case-insensitive search
    const q = filters.query.trim().toLowerCase();

    return MOCK_STATIONS
      // filters by search query
      .filter((s) => (q ? s.name.toLowerCase().includes(q) : true))
      
      // filters by condition
      .filter((s) => (filters.condition === "all" ? true : s.condition === filters.condition))

      // filters by line
      .filter((s) => (filters.line === "all" ? true : s.line === filters.line));
  }, [filters]);

  /**
   * Generic handler for filter updates
   * 
   * key = which filter is changing
   * value = new value that it is changing to
   */
  const onChange = (key, value) =>
    setFilters((prev) => ({ ...prev, [key]: value }));

  // resets all filters to default state
  const onClear = () =>
    setFilters({ query: "", condition: "all", line: "all" });

  return (
    <div className="max-w-6xl mx-auto space-y-6">

      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">
          CTrain Stations
        </h1>
        <p className="text-sm text-gray-600">
          Browse the list of CTrain stations and view their CEI ratings.
        </p>
      </div>

      {/* Reusable Filter Bar */}
      <FilterBar
        filters={stationListFilters}
        values={filters}
        onChange={onChange}
        onClear={onClear}
      />

      {/* Station List */}
      <div className="space-y-5 pt-1">
        {filteredStations.map((station) => (
          <StationCard key={station.id} station={station} />
        ))}
      </div>
    </div>
  );
}