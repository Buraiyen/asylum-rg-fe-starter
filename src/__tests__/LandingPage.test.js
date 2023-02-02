import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import RenderLandingPage from '../components/pages/Landing/RenderLandingPage';

describe('<Button /> test suite', () => {
  test('"Data" button navigates to /graphs when clicked', () => {
    const { getByText } = render(
      <Router>
        <RenderLandingPage />
      </Router>
    );
    const button = getByText(/view the data/i);
    expect(button.textContent).toBe('View the Data');
    fireEvent.click(button);
    expect(window.location.pathname).toEqual('/graphs');
  });
});
