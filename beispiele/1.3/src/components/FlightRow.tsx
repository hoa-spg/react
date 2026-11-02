import './FlightRow.css';

type FlightRowProps = {
  flightNumber: string;
  airline: string;
  destination: string;
  time: string;
};

const FlightRow = (props: FlightRowProps) => {
  return (
    <tr>
      <td className="flight-row-cell">{props.flightNumber}</td>
      <td className="flight-row-cell">{props.airline}</td>
      <td className="flight-row-cell">{props.destination}</td>
      <td className="flight-row-cell">{props.time}</td>
    </tr>
  );
};

export default FlightRow;
