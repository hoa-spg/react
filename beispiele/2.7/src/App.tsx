import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import DeparturePage from './pages/DeparturePage';
import ArrivalPage from './pages/ArrivalPage';
import FlightDetailPage from './pages/FlightDetailPage';
import NotFoundPage from './pages/NotFoundPage';

/**
 * Root component for L10.
 * Defines the client-side route structure with React Router v6.
 */
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/departures" replace />} />
        <Route path="departures" element={<DeparturePage />} />
        <Route path="arrivals" element={<ArrivalPage />} />
        <Route path="flight/:id" element={<FlightDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
