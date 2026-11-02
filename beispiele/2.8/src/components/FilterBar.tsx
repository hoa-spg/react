import React from 'react';
import './FilterBar.css';
import { FlightStatus } from '../types/flight';

interface FilterBarProps {
  statusFilter: 'all' | FlightStatus;
  onStatusChange: (value: 'all' | FlightStatus) => void;
  onReset: () => void;
  hasActiveFilters: boolean;
}

/**
 * Filter bar with type and status dropdowns and an optional reset button.
 */
const FilterBar = ({
  statusFilter,
  onStatusChange,
  onReset,
  hasActiveFilters,
}: FilterBarProps) => {
  return (
    <div className="filter-bar">
      <select
        className="filter-select"
        value={statusFilter}
        onChange={(e) => onStatusChange(e.target.value as 'all' | FlightStatus)}
      >
        <option value="all">Alle Flüge</option>
        <option value="on-time">Pünktlich</option>
        <option value="delayed">Verspätet</option>
        <option value="boarding">Boarding</option>
        <option value="departed">Gestartet</option>
        <option value="landed">Gelandet</option>
        <option value="cancelled">Gestrichen</option>
      </select>

      {hasActiveFilters && (
        <button className="filter-reset" onClick={onReset}>
          Zurücksetzen
        </button>
      )}
    </div>
  );
};

export default FilterBar;
