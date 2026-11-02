'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="state-screen state-screen--error">
      <h2 className="state-title">Fehler beim Laden</h2>
      <p className="state-text">{error.message}</p>
      <button onClick={reset} className="ghost-btn">
        Erneut versuchen
      </button>
    </div>
  );
}
