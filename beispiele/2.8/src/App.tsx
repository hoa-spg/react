import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import FlightListPage from './pages/FlightListPage';
import FlightDetailPage from './pages/FlightDetailPage';
import NotFoundPage from './pages/NotFoundPage';

/**
 * Root component for lesson 2.8.
 * Defines the client-side route structure with React Router v6.
 */
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/departures" replace />} />
        {/* Eine Seitenkomponente für beide Listen; key sorgt dafür, dass React
            beim Wechsel eine neue Instanz erzeugt (z.B. Formular wieder zu) */}
        <Route path="departures" element={<FlightListPage key="departure" type="departure" />} />
        <Route path="arrivals" element={<FlightListPage key="arrival" type="arrival" />} />
        <Route path="flight/:id" element={<FlightDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
