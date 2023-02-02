import './Insights.css';

function Insights() {
  return (
    <section className="bottom-section">
      <h2 className="title">Systemic Disparity Insights</h2>
      <div className="insights-container">
        <div className="insight">
          <h3 className="stats">36%</h3>
          <p className="description">
            By the end of the Trump administration, the average asylum office
            grant rate had fallen 44 percent in fiscal year 2016 to 28 percent
            in fiscal year 2020.
          </p>
        </div>
        <div className="insight">
          <h3 className="stats">5%</h3>
          <p className="description">
            The New York asylum office grant rate dropped to 5 percent in fiscal
            year 2020
          </p>
        </div>
        <div className="insight">
          <h3 className="stats">6x Lower</h3>
          <p className="description">
            Between fiscal year 2017 and 2020, the New York asylum office’s
            average grant rate was six times lower than the San Francisco asylum
            office
          </p>
        </div>
      </div>
    </section>
  );
}

export default Insights;
