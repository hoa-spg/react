import './App.css';

const App = () => {
  return (
    <div className="app-page">
      <h1 className="app-heading">✈ FlugBoard 1.2</h1>
      <p className="app-subheading">Flughafen Wien-Schwechat</p>

      <section>
        <h2 className="section-heading">Abflüge</h2>
        <table className="flight-table">
          <thead>
            <tr>
              <th>Flug</th>
              <th>Airline</th>
              <th>Ziel</th>
              <th>Zeit</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {/* Flight 1 — Boarding */}
            <tr>
              <td>OS123</td>
              <td>Austrian Airlines</td>
              <td>London Heathrow (LHR)</td>
              <td>10:30</td>
              <td>
                <span className="status-badge status-boarding">
                  Boarding
                </span>
              </td>
            </tr>

            {/* Flight 2 — Delayed */}
            <tr>
              <td>LH456</td>
              <td>Lufthansa</td>
              <td>Frankfurt (FRA)</td>
              <td>11:15</td>
              <td>
                <span className="status-badge status-delayed">
                  Verspätet
                </span>
              </td>
            </tr>

            {/* Flight 3 — On time */}
            <tr>
              <td>BA234</td>
              <td>British Airways</td>
              <td>London Heathrow (LHR)</td>
              <td>12:00</td>
              <td>
                <span className="status-badge status-on-time">
                  Pünktlich
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default App;
