import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import TextPressure from "./assetBits/TextPressure";
import Navbar from "./components/navbar";
import Main from "./components/containerpertama";
import Lakban from "./components/containerkedua";
import Aboutme from "./components/containerketiga";
import ContainerKeempat from "./components/containerkeempat";
import Lakban2 from "./components/containerkelima";
import Photobooth from "./components/containerkeenam";
import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <Main />
      <Lakban />
      <Aboutme />
      <ContainerKeempat />
      <Lakban2 />
      <Photobooth />
    </>
  );
}

export default App;
