import { useOutletContext } from 'react-router-dom';
import { UseFlightsReturn } from './useFlights';

/**
 * Returns the flight data that Layout loads once and passes down
 * via <Outlet context={...} />.
 */
const useFlightData = () => useOutletContext<UseFlightsReturn>();

export default useFlightData;
