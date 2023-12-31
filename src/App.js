import "./App.css";
import React, { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import News from "./components/News";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

const App = () => {
  const apiKey = process.env.REACT_APP_NEWS_API;

  let finalTheme = 'light';
  if (localStorage.getItem('theme')) {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark')
      finalTheme = 'dark';
  }

  const [progress, setProgress] = useState(0);
  const [mode, setMode] = useState(finalTheme);

  const enableLightMode = () => {
    setMode('light');
    localStorage.setItem('theme', 'light');
    document.body.style.backgroundColor = 'white';
    document.title = "NewsAgent - Light Mode";
    setTimeout(() => {
      document.title = "NewsAgent"
    }, 1500);
  }

  const enableDarkMode = () => {
    setMode('dark');
    localStorage.setItem('theme', 'dark');
    document.body.style.backgroundColor = 'black';
    document.title = "NewsAgent - Dark Mode";
    setTimeout(() => {
      document.title = "NewsAgent"
    }, 1500);
  }

  const toggleMode = () => {
    if (mode === 'light') {
      enableDarkMode();
    } else {
      enableLightMode();
    }
  }

  useEffect(() => {
    const localTheme = localStorage.getItem('theme');
    if (localTheme) {
      if (localTheme === 'dark') {
        enableDarkMode();
      } else {
        enableLightMode();
      }
    } else {
      enableLightMode();
    }
  }, [mode]);

  return (
    <div>
      <Router>
        <NavBar mode={mode} toggleMode={toggleMode} />
        <LoadingBar
          color='#f11946'
          progress={progress}
        />
        <Routes>
          <Route exact path="/" element={<News mode={mode} toggleMode={toggleMode} apiKey={apiKey} setProgress={setProgress} key="general" pageSize="8" country="in" category="general" />} />
          <Route exact path="/business" element={<News mode={mode} toggleMode={toggleMode} apiKey={apiKey} setProgress={setProgress} key="business" pageSize="8" country="in" category="business" />} />
          <Route exact path="/entertainment" element={<News mode={mode} toggleMode={toggleMode} apiKey={apiKey} setProgress={setProgress} key="entertainment" pageSize="8" country="in" category="entertainment" />} />
          <Route exact path="/general" element={<News mode={mode} toggleMode={toggleMode} apiKey={apiKey} setProgress={setProgress} key="general" pageSize="8" country="in" category="general" />} />
          <Route exact path="/health" element={<News mode={mode} toggleMode={toggleMode} apiKey={apiKey} setProgress={setProgress} key="health" pageSize="8" country="in" category="health" />} />
          <Route exact path="/science" element={<News mode={mode} toggleMode={toggleMode} apiKey={apiKey} setProgress={setProgress} key="science" pageSize="8" country="in" category="science" />} />
          <Route exact path="/sports" element={<News mode={mode} toggleMode={toggleMode} apiKey={apiKey} setProgress={setProgress} key="sports" pageSize="8" country="in" category="sports" />} />
          <Route exact path="/technology" element={<News mode={mode} toggleMode={toggleMode} apiKey={apiKey} setProgress={setProgress} key="technology" pageSize="8" country="in" category="technology" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;