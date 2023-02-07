import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import CitizenshipMapAll from './Graphs/CitizenshipMapAll';
import CitizenshipMapSingleOffice from './Graphs/CitizenshipMapSingleOffice';
import TimeSeriesAll from './Graphs/TimeSeriesAll';
import OfficeHeatMap from './Graphs/OfficeHeatMap';
import TimeSeriesSingleOffice from './Graphs/TimeSeriesSingleOffice';
import YearLimitsSelect from './YearLimitsSelect';
import ViewSelect from './ViewSelect';
// import axios from 'axios';
import { resetVisualizationQuery } from '../../../state/actionCreators';
import { colors } from '../../../styles/data_vis_colors';
import ScrollToTopOnMount from '../../../utils/scrollToTopOnMount';
import { setVisualizationData } from '../../../state/actionCreators';
import axios from 'axios';
const { background_color } = colors;

function GraphWrapper(props) {
  const { set_view, dispatch } = props;
  let { office, view } = useParams();
  if (!view) {
    set_view('time-series');
    view = 'time-series';
  }
  let map_to_render;
  if (!office) {
    updateStateWithNewData([2015, 2022], view, 'any', setVisualizationData);
    switch (view) {
      case 'time-series':
        map_to_render = <TimeSeriesAll />;
        break;
      case 'office-heat-map':
        map_to_render = <OfficeHeatMap />;
        break;
      case 'citizenship':
        map_to_render = <CitizenshipMapAll />;
        break;
      default:
        break;
    }
  } else {
    updateStateWithNewData([2015, 2022], view, office, setVisualizationData);
    switch (view) {
      case 'time-series':
        map_to_render = <TimeSeriesSingleOffice office={office} />;
        break;
      case 'citizenship':
        map_to_render = <CitizenshipMapSingleOffice office={office} />;
        break;
      default:
        break;
    }
  }
  function updateStateWithNewData(years, view, office, stateSettingCallback) {
    if (view === 'time-series' || view === 'office-heat-map') {
      if (!office || office === 'any') {
        axios
          .get(process.env.REACT_APP_API_URI + '/fiscalSummary', {
            // mock URL, can be simply replaced by `${Real_Production_URL}/summary` in prod!
            params: {
              from: years[0],
              to: years[1],
              office: 'any',
            },
          })
          .then(result => {
            let formattedData = [result.data];
            // sorting data by fiscal_year
            const sorted = formattedData[0].yearResults.sort((a, b) => {
              return a.fiscal_year > b.fiscal_year;
            });
            formattedData[0].yearResults = sorted;
            stateSettingCallback(view, office, formattedData); // <-- `test_data` here can be simply replaced by `result.data` in prod!
          })
          .catch(err => {
            console.log('FAIL');
            console.error(err);
          });
      } else {
        axios
          .get(process.env.REACT_APP_API_URI + '/fiscalSummary', {
            // mock URL, can be simply replaced by `${Real_Production_URL}/summary` in prod!
            params: {
              from: years[0],
              to: years[1],
              office: office,
            },
          })
          .then(result => {
            let formattedData = [result.data];
            // sorting data by fiscal_year
            const sorted = formattedData[0].yearResults.sort((a, b) => {
              return a.fiscal_year > b.fiscal_year;
            });
            formattedData[0].yearResults = sorted;
            stateSettingCallback(view, office, formattedData); // <-- `test_data` here can be simply replaced by `result.data` in prod!
          })
          .catch(err => {
            console.error(err);
          });
      }
    } else if (view === 'citizenship') {
      if (!office || office === 'any') {
        axios
          .get(process.env.REACT_APP_API_URI + '/citizenshipSummary')
          .then(res => {
            stateSettingCallback('citizenship', 'any', res.data); // <-- `test_data` here can be simply replaced by `result.data` in prod!
          });
      } else {
        axios
          .get(process.env.REACT_APP_API_URI + '/citizenshipSummary')
          .then(res => {
            console.log(res.data);
            stateSettingCallback('citizenship', office, [
              { citizenshipResults: res.data },
            ]); // <-- `test_data` here can be simply replaced by `result.data` in prod!
          });
      }
    }
  }
  const clearQuery = (view, office) => {
    dispatch(resetVisualizationQuery(view, office));
  };
  return (
    <div
      className="map-wrapper-container"
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        minHeight: '50px',
        backgroundColor: background_color,
      }}
    >
      <ScrollToTopOnMount />
      {map_to_render}
      <div
        className="user-input-sidebar-container"
        style={{
          width: '300px',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <ViewSelect set_view={set_view} />
        <YearLimitsSelect
          view={view}
          office={office}
          clearQuery={clearQuery}
          updateStateWithNewData={updateStateWithNewData}
        />
      </div>
    </div>
  );
}

export default connect()(GraphWrapper);
