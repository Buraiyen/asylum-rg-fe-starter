import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import reducer from '../state/reducers';
import TimeSeriesAll from '../components/pages/DataVisualizations/Graphs/TimeSeriesAll';
import TimeSeriesSingleOffice from '../components/pages/DataVisualizations/Graphs/TimeSeriesSingleOffice';
import CitizenshipMapAll from '../components/pages/DataVisualizations/Graphs/CitizenshipMapAll';
import CitizenshipMapSingleOffice from '../components/pages/DataVisualizations/Graphs/CitizenshipMapSingleOffice';
import OfficeHeatMap from '../components/pages/DataVisualizations/Graphs/OfficeHeatMap';

beforeEach(() => {
  jest.spyOn(console, 'error');
  // @ts-ignore jest.spyOn adds this functionallity
  console.error.mockImplementation(() => null);
});

afterEach(() => {
  // @ts-ignore jest.spyOn adds this functionallity
  console.error.mockRestore();
});

describe('TimeSeries test suite', () => {
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

  test('<TimeSeriesSingleOffice /> renders correctly when passing "New York, NY" as a prop', () => {
    const store = configureStore({ reducer: reducer });
    const { getByText } = render(
      <Provider store={store}>
        <TimeSeriesSingleOffice office={'New York, NY'} />
      </Provider>
    );
    const title = getByText(
      /showing: time series data for all uscis asylum offices/i
    );
    expect(title.textContent).toEqual(
      'Showing: Time series data for all USCIS Asylum Offices - (New York, NY)'
    );
  });

  test('<TimeSeriesSingleOffice /> fails to render when passing invalid data', () => {
    const store = configureStore({ reducer: reducer });
    expect(() => {
      render(
        <Provider store={store}>
          <TimeSeriesSingleOffice office={null} />
        </Provider>
      );
    }).toThrow("Cannot read property 'timeSeriesData' of undefined");
  });
});

describe('CitizenshipMap test suite', () => {
  // test('<CitizenshipMapAll /> renders correctly', () => {
  //   const store = configureStore({ reducer: reducer });
  //   const { getByText } = render(
  //     <Provider store={store}>
  //       <CitizenshipMapAll />
  //     </Provider>
  //   );
  //   const title = getByText(/showing: rates of 'granted'/i);
  //   expect(title.textContent).toEqual(
  //     "Showing: Rates of 'granted' case decision by nationality of origin, for all offices"
  //   );
  // });
  test('<CitizenshipMapSingleOffice /> renders correctly when passing "New York, NY" as a pro', () => {
    const store = configureStore({ reducer: reducer });
    const { getByText } = render(
      <Provider store={store}>
        <CitizenshipMapSingleOffice office={'New York, NY'} />
      </Provider>
    );
    const title = getByText(/new york, ny/i);
    expect(title.textContent).toEqual(
      "Showing: Rates of 'granted' case decision by nationality of origin, for New York, NY"
    );
  });
  test('<CitizenshipMapSingleOffice /> fails to render when passing invalid data', () => {
    const store = configureStore({ reducer: reducer });
    expect(() => {
      render(
        <Provider store={store}>
          <CitizenshipMapSingleOffice office={null} />
        </Provider>
      );
    }).toThrow("Cannot read property 'citizenshipMapData' of undefined");
  });
});

describe('<OfficeHeatMap /> test suite', () => {
  test('<OfficeHeatMap /> renders correctly', () => {
    const store = configureStore({ reducer: reducer });
    const { getByText } = render(
      <Provider store={store}>
        <OfficeHeatMap />
      </Provider>
    );
    const title = getByText(/rates of 'granted'/i);
    expect(title.textContent).toEqual(
      "Showing: Rates of 'granted' case decision by asylum office, by year"
    );
  });
});
