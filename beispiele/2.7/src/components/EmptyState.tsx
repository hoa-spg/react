import React from 'react';
import './EmptyState.css';

interface EmptyStateProps {
  message?: string;
  onReset?: () => void;
}

/**
 * Placeholder shown when a flight list is empty.
 * @param message - Custom message to display (defaults to "Keine Flüge gefunden").
 * @param onReset - Optional callback for a reset/clear-filter button.
 */
const EmptyState = ({
  message = 'Keine Flüge gefunden',
  onReset,
}: EmptyStateProps) => {
  return (
    <div className="empty-state">
      <span className="empty-icon">✈</span>
      <p className="empty-text">{message}</p>
      {onReset && (
        <button className="empty-btn" onClick={onReset}>
          Filter zurücksetzen
        </button>
      )}
    </div>
  );
};

export default EmptyState;
