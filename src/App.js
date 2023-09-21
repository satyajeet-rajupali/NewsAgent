import "./App.css";
import React, { Component } from "react";
import NavBar from "./components/NavBar";
import News from "./components/News";

export class App extends Component {
  c = "John";
  render() {
    return (
      <div>
        <NavBar />
        <News />
      </div>
    );
  }
}

export default App;