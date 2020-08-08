import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setFetchLoading,
  fetchRandomPlanet,
  initialFetches,
} from './redux/modules/planet';
import randomizeIntWithinRange from './assets/js/utils/randomizeIntWithinRange';

import Header from './components/Header/Header';
import FetchLoading from './components/FetchLoading/FetchLoading';
import FetchError from './components/FetchError/FetchError';
import PlanetInfo from './components/PlanetInfo/PlanetInfo';
import FetchButton from './components/FetchButton/FetchButton';

function App() {
  const dispatch = useDispatch();
  const useMountEffect = callbackFunction => useEffect(callbackFunction, []);
  const { fetchStatus, totalPlanets } = useSelector(state => state.planet);

  useMountEffect(() => {
    dispatch(initialFetches());
  });

  const handleButtonClick = () => {
    dispatch(setFetchLoading(true));
    if (totalPlanets) {
      dispatch(fetchRandomPlanet(randomizeIntWithinRange(1, totalPlanets)));
    } else {
      dispatch(initialFetches());
    }
  };

  return (
    <div>
      <Header />
      <div className="main-container">
        <div className="central-container">
          {fetchStatus.hasError && <FetchError />}
          {fetchStatus.isLoading && !fetchStatus.hasError && <FetchLoading />}
          {!fetchStatus.isLoading && !fetchStatus.hasError && <PlanetInfo />}
        </div>
        <FetchButton
          text="Next"
          onClick={handleButtonClick}
          isDisabled={fetchStatus.isLoading}
        />
      </div>
    </div>
  );
}

export default App;
