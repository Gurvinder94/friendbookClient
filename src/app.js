import React from "react";
import Homepage from "./components/Homepage";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import Profile from "./components/Profile";
import { CookiesProvider } from "react-cookie";
function App() {
  return (
    <CookiesProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Homepage />} />
          <Route path="/" element={<Profile />}></Route>
        </Routes>
      </BrowserRouter>
    </CookiesProvider>
  );
}

export default App;
