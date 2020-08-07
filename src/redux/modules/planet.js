import fetchWithTimeout from '../../assets/js/utils/fetchWithTimeout';
import randomizeIntWithinRange from '../../assets/js/utils/randomizeIntWithinRange';
import formatPlanet from '../../assets/js/utils/formatPlanet';

const apiPrefix = 'https://swapi.dev/api';

const types = {
  SET_FETCH_LOADING: 'planet/SET_FETCH_LOADING',
  SET_FETCH_ERROR: 'planet/SET_FETCH_ERROR',
  SET_TOTAL_PLANETS: 'planet/SET_TOTAL_PLANETS',
  SET_CURRENT_PLANET: 'planet/SET_CURRENT_PLANET',
};

const initialState = {
  fetchStatus: {
    isLoading: true,
    hasError: false,
  },
  totalPlanets: 0,
  fetchedPlanets: {},
  currentPlanet: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_FETCH_LOADING:
      return {
        ...state,
        fetchStatus: {
          isLoading: action.isLoading,
          hasError: false,
        },
      };
    case types.SET_FETCH_ERROR:
      return {
        ...state,
        fetchStatus: {
          isLoading: false,
          hasError: action.hasError,
        },
      };
    case types.SET_TOTAL_PLANETS:
      return {
        ...state,
        totalPlanets: action.totalPlanets,
      };
    case types.SET_CURRENT_PLANET:
      return {
        ...state,
        fetchStatus: {
          isLoading: false,
          hasError: false,
        },
        fetchedPlanets: {
          ...state.fetchedPlanets,
          [action.planetId]: action.planet,
        },
        currentPlanet: action.planet,
      };
    default:
      return state;
  }
};

export const setFetchLoading = isLoading => ({
  type: types.SET_FETCH_LOADING,
  isLoading,
});

export const setFetchError = hasError => ({
  type: types.SET_FETCH_ERROR,
  hasError,
});

export const setTotalPlanets = totalPlanets => ({
  type: types.SET_TOTAL_PLANETS,
  totalPlanets,
});

export const setCurrentPlanet = (planetId, planet) => ({
  type: types.SET_CURRENT_PLANET,
  planetId,
  planet,
});

export const fetchRandomPlanet = planetId => (dispatch, getState) => {
  if (planetId in getState().planet.fetchedPlanets) {
    setTimeout(() => {
      dispatch(
        setCurrentPlanet(planetId, getState().planet.fetchedPlanets[planetId]),
      );
    }, 300);
  } else {
    fetchWithTimeout({
      url: `${apiPrefix}/planets/${planetId}/`,
      timeout: 10000,
    })
      .then(response => response.json())
      .then(planet => {
        dispatch(setCurrentPlanet(planetId, formatPlanet(planet)));
      })
      .catch(() => {
        dispatch(setFetchError(true));
      });
  }
};

export const initialFetches = () => dispatch => {
  fetchWithTimeout({
    url: `${apiPrefix}/planets/`,
    timeout: 10000,
  })
    .then(response => response.json())
    .then(planets => {
      dispatch(setTotalPlanets(planets.count));
      dispatch(fetchRandomPlanet(randomizeIntWithinRange(1, planets.count)));
    })
    .catch(() => {
      dispatch(setFetchError(true));
    });
};

export default reducer;
