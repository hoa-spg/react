import { Link, useLocation } from 'react-router-dom';

/**
 * 404 page displayed when no route matches.
 * Shows the current path and a link back to departures.
 */
const NotFoundPage = () => {
  const location = useLocation();

  return (
    <div className="not-found">
      <div className="not-found-icon">✈</div>
      <h1 className="not-found-code">404</h1>
      <p className="not-found-title">Seite nicht gefunden</p>
      <p className="not-found-route">
        Die Route{' '}
        <code className="route-code">
          {location.pathname}
        </code>{' '}
        existiert nicht.
      </p>
      <Link to="/departures" className="cta-link">
        Zur Abflugtafel
      </Link>
    </div>
  );
};

export default NotFoundPage;
