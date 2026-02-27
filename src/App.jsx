import { NavLink, Route, Routes } from "react-router";
import Sample from "./componants/Sample";
import Random from "./componants/Random";

export default function App() {
  return <>
    <h1>React-based Three-In-A-Row Game</h1>
    <nav>
      <NavLink to="/" end>
        Home
      </NavLink>
      &nbsp;|&nbsp;
      <NavLink to="/sample" end>
        Sample Game
      </NavLink>
      &nbsp;|&nbsp;
      <NavLink to="/random" end>
        Random Game
      </NavLink>
    </nav>
    <Routes>
      <Route path="/" element={<div />} />
      <Route path="/sample" element={<Sample />} />
      <Route path="/random" element={<Random />} />
    </Routes>
  </>
}

