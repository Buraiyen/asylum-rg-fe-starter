import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import reducer from '../state/reducers';
import TimeSeriesAll from '../components/pages/DataVisualizations/Graphs/TimeSeriesAll';

describe('<TimeSeriesAll /> test suite', () => {
  test('<TimeSeriesAll /> renders correctly', () => {
    const store = configureStore({ reducer: reducer });
    const { getByText } = render(
      <Provider store={store}>
        <TimeSeriesAll />
      </Provider>
    );
    const title = getByText(
      /showing: time series data for all uscis asylum offices/i
    );
    expect(title.textContent).toEqual(
      'Showing: Time series data for all USCIS Asylum Offices'
    );
  });
});
