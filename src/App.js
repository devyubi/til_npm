import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Line from "./components/chart/Line";
import Bar from "./components/chart/Bar";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<h1>홈</h1>}></Route>
        <Route path="/about" element={<h1>About</h1>}></Route>
        <Route path="/bar" element={<Bar />}></Route>
        <Route path="/line" element={<Line />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
