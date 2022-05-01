import CardList from "./Components/CardList";
import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Game from "./Components/Game";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<CardList />} />
                <Route path="play/" element={<Game />} />
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
