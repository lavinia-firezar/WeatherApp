export const initialStateFav = {
  citiesFav: [],
};

export function favoriteReducer(state, action) {
  const newCity = action.payload;
  const previousCities = state.citiesFav;

  switch (action.type) {
    case "ADD_TO_FAVORITE": {
      const cityExistList = previousCities.find((city) => {
        return newCity.id === city.id;
      });

      if (cityExistList) {
        return state;
      } else {
        const newState = {
          citiesFav: [newCity, ...previousCities],
        };
        return newState;
      }
    }
    case "REMOVE_FROM_FAVORITE": {
      const removedCity = previousCities.filter((city) => {
        return city.id === newCity;
      });
      const newState = {
        citiesFav: removedCity,
      };
      return newState;
    }
    default: {
      return state;
    }
  }
}
