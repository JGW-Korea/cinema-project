import { React } from "react";
import "./App.module.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./routes/Home";
import SignUp from "./routes/SignUp/SignUp";
import Login from "./routes/Login/Login";
import MovieInfo from "./components/Home/Movieinfo/MovieInfo";
import Booking from "./routes/booking/Booking";
import Seat from "./routes/Seat/Seat";
import UserInfo from "./components/Home/Main/UserInfo/UserInfo";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/Login" element={<Login />}></Route>
        <Route path="/Join" element={<SignUp />}></Route>
        <Route path="/Movie/:id/:title" element={<MovieInfo />} />
        <Route path="/UserInfo/:id/:name" element={<UserInfo />} />
        <Route path="/Booking" element={<Booking />} />
        <Route path="/Seat/:title/:id" element={<Seat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
