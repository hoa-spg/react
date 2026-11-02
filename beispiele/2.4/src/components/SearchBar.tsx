import React from 'react';
import './SearchBar.css';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

/**
 * Controlled search input with optional clear button.
 * @param value       - Current search string.
 * @param onChange    - Callback with new search value.
 * @param placeholder - Input placeholder text.
 */
const SearchBar = ({
  value,
  onChange,
  placeholder = 'Suchen…',
}: SearchBarProps) => {
  return (
    <div className="search-wrap">
      <input
        type="text"
        className="search-input"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <button className="search-clear" onClick={() => onChange('')} title="Löschen">
          ✕
        </button>
      )}
    </div>
  );
};

export default SearchBar;
