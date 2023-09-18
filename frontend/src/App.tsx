import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/home/Home";
import {Friend} from "./pages/Friend/Friend";
import { Marketplace } from "./pages/Marketplace/Marketplace";
import { Group } from "./pages/Group/Group";
import { Login } from "./pages/auth/Login";
import { Activate } from "./pages/auth/Activate";
import { Forget } from "./pages/auth/Forget";
import { Reset } from "./pages/auth/Reset";
import { Register } from "./pages/auth/Register";
import { Profile } from "./pages/profiles/Profile";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/friend" element={<Friend />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/group" element={<Group />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forget" element={<Forget />} />
        <Route path="/reset-password/:id" element={<Reset />} />
        <Route path="/activate/:id" element={<Activate />} />
        <Route path="/profile">
          <Route index element={<Profile />} />
          <Route path=":id" element />
        </Route>
      </Routes>
    </>
  );
}

export default App;
