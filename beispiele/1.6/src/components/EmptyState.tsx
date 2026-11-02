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
      <span className="empty-state-icon">✈</span>
      <p className="empty-state-message">{message}</p>
      {onReset && (
        <button className="empty-state-reset-btn" onClick={onReset}>
          Filter zurücksetzen
        </button>
      )}
    </div>
  );
};

export default EmptyState;
