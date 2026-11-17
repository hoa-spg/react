import './EmptyState.css';

interface EmptyStateProps {
  message?: string;
}

/**
 * Placeholder shown when a flight list is empty.
 * @param message - Custom message to display (defaults to "Keine Flüge gefunden").
 */
const EmptyState = ({ message = 'Keine Flüge gefunden' }: EmptyStateProps) => {
  return (
    <div className="empty-state">
      <span className="empty-icon">✈</span>
      <p className="empty-text">{message}</p>
    </div>
  );
};

export default EmptyState;
