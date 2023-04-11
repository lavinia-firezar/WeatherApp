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

function App() {
  const [favState, favDispatch] = useReducer(favoriteReducer, initialStateFav);
  const favoriteContextValue = {
    favState,
    favDispatch,
  };

  return (
    <div className="App">
      <FavoriteContext.Provider value={favoriteContextValue}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorite" element={<Favorite />} />
          <Route path="/forecast" element={<Forecast />} />
        </Routes>
      </FavoriteContext.Provider>
    </div>
  );
}

export default App;
