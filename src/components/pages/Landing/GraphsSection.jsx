import React from 'react';
import GrantRatesByOfficeImg from '../../../styles/Images/bar-graph-no-text.png';
import GrantRatesByNationalityImg from '../../../styles/Images/pie-chart-no-text.png';
import GrantRatesOverTimeImg from '../../../styles/Images/line-graph-no-text.png';
import './GraphsSection.css';

function GraphsSection() {
  return (
    <section className="graphs-section">
      <div className="section-container">
        <img
          src={GrantRatesByOfficeImg}
          alt="Bar chart of grant rates by office"
          className="graph-img__bar"
        />
        <p>Search Grant Rates By Office</p>
      </div>
      <div className="section-container">
        <img
          src={GrantRatesByNationalityImg}
          alt="Pie chart of grant rates by office"
          className="graph-img__pie"
        />
        <p>Search Grant Rates By Nationality</p>
      </div>
      <div className="section-container">
        <img
          src={GrantRatesOverTimeImg}
          alt="Line chart of grant rates over time"
          className="graph-img__line"
        />
        <p>Search Grant Rates By Nationality</p>
      </div>
    </section>
  );
}

export default GraphsSection;
