export function addToFavorite(city) {
  return {
    type: "ADD_TO_FAVORITE",
    payload: city,
  };
}

export function removeFromFavorite(cityId) {
  return {
    type: "REMOVE_FROM_FAVORITE",
    payload: cityId,
  };
}
