import React from 'react'
import './App.scss'
import NavigationBar from "./Components/NavigationBar/NavigationBar";
import { YMaps } from "@pbe/react-yandex-maps";

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
