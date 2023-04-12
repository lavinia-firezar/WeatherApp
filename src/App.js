import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Favorite from "./pages/Favorite";
import Forecast from "./pages/Forecast";
import { FavoriteContext } from "./store/AddToFavorite/context";
import { useReducer } from "react";
import {
  favoriteReducer,
  initialStateFav,
} from "./store/AddToFavorite/reducer";
import { ThemeContext } from "./store/ChangeTheme/context";
import { initialStateTheme, themeReducer } from "./store/ChangeTheme/reducer";

function App() {
  const [favState, favDispatch] = useReducer(favoriteReducer, initialStateFav);
  const favoriteContextValue = {
    favState,
    favDispatch,
  };

  const [themeState, themeDispatch] = useReducer(
    themeReducer,
    initialStateTheme
  );
  const themeContextValue = {
    themeState,
    themeDispatch,
  };

  return (
    <div className="App">
      <ThemeContext.Provider value={themeContextValue}>
        <FavoriteContext.Provider value={favoriteContextValue}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorite" element={<Favorite />} />
            <Route path="/forecast" element={<Forecast />} />
          </Routes>
        </FavoriteContext.Provider>
      </ThemeContext.Provider>
    </div>
  );
}

export default App;
