export const initialStateTheme = {
  theme: "rainy",
};

export function themeReducer(state, action) {
  switch (action.type) {
    case "SUNNY": {
      return {
        theme: "sunny",
      };
    }
    case "RAINY": {
      return {
        theme: "rainy",
      };
    }
    default: {
      return state;
    }
  }
}
