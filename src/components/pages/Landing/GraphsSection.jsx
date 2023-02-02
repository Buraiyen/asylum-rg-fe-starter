import React from 'react';
import GrantRatesByOfficeImg from '../../../styles/Images/bar-graph-no-text.png';
import GrantRatesByNationalityImg from '../../../styles/Images/pie-chart-no-text.png';
import GrantRatesOverTimeImg from '../../../styles/Images/line-graph-no-text.png';

function GraphsSection() {
  return (
    <section className="graphs-section">
      <div>
        <img
          src={GrantRatesByOfficeImg}
          alt="Bar chart of grant rates by office"
        />
      </div>
      <div>
        <img
          src={GrantRatesByNationalityImg}
          alt="Pie chart of grant rates by office"
        />
      </div>
      <div>
        <img
          src={GrantRatesOverTimeImg}
          alt="Line chart of grant rates over time"
        />
      </div>
    </section>
  );
}

export default GraphsSection;
