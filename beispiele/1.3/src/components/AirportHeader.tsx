import './AirportHeader.css';

const AirportHeader = ({ airportName }: { airportName: string }) => {
  return (
    <header>
      <h1 className="airport-title">✈ FlugBoard 1.3</h1>
      <p className="airport-subtitle">{airportName}</p>
    </header>
  );
};

export default AirportHeader;
