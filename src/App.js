import { React } from "react";
import "./App.module.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./routes/Home";
import SignUp from "./routes/SignUp/SignUp";
import Login from "./routes/Login/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/Login" element={<Login />}></Route>
        <Route path="/Join" element={<SignUp />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
