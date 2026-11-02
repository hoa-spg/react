import './Welcome.css';

const Welcome = (props: { name: string }) => {
  return <p className="welcome-message">Hallo {props.name}!</p>;
};

export default Welcome;
