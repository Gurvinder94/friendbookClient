import React from "react";
import Homepage from "./components/Homepage";
import User from "./components/User";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Homepage />} />
        <Route
          path="*"
          element={
            <>
              <User />
            </>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
