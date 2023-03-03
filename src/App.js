import React from 'react'
import './App.scss'
import NavigationBar from "./Components/NavigationBar";
import { YMaps } from "react-yandex-maps";

function App() {
  
  return (
    <div className="App">
      <YMaps>
        <NavigationBar/>
      </YMaps>
    </div>
  );
}

export default App;
