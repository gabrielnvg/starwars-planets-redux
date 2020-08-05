import formatPlanet from '../../assets/js/utils/formatPlanet';

const types = {
  INCREMENT_PLANET_NAME: 'planet/INCREMENT_PLANET_NAME',
}

const initialState = {
  interactionCounter: 0,
  currentPlanet: formatPlanet({
    name: 'Redux Planet 0',
    population: '99999999',
    climate: 'temperate, tropical',
    terrain: 'grassy hills, swamps, forests, mountains',
    films: [
      'https://swapi.dev/api/films/5/',
      'https://swapi.dev/api/films/4/',
      'https://swapi.dev/api/films/6/',
      'https://swapi.dev/api/films/3/',
      'https://swapi.dev/api/films/1/',
    ],
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.INCREMENT_PLANET_NAME:
      return {
        ...state,
        interactionCounter: state.interactionCounter + 1,
        currentPlanet: {
          ...state.currentPlanet,
          name: `Redux Planet ${state.interactionCounter + 1}`,
        },
      };
    default:
      return state;
  }
}

export const incrementPlanetName = () => ({
  type: types.INCREMENT_PLANET_NAME,
});

export default reducer;
