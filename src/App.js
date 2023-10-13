import './App.css';
import React, { useState } from 'react'
import Navbar from './Components/Navbar';
import News from './Components/News';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

function App() {
  const [progress, setProgress] = useState(0);
  let pageSize = 9;

  const updateProgress = (progress) => {
    setProgress(progress);
  };

  return (
    <div>
      <Router>
        <LoadingBar
          color='#f11946'
          height={5}
          progress={progress}
        />
        <Navbar />
        <Routes>
          <Route exact path="/" element={<News updateProgress={setProgress} key="Home" pageSize={pageSize} country="in" category="general" />} />
          <Route exact path="/business" element={<News updateProgress={setProgress} key="Business" pageSize={pageSize} country="in" category="business" />} />
          <Route exact path="/entertainment" element={<News updateProgress={setProgress} key="Entertainment" pageSize={pageSize} country="in" category="entertainment" />} />
          <Route exact path="/general" element={<News updateProgress={setProgress} key="General" pageSize={pageSize} country="in" category="general" />} />
          <Route exact path="/health" element={<News updateProgress={setProgress} key="Health" pageSize={pageSize} country="in" category="health" />} />
          <Route exact path="/science" element={<News updateProgress={setProgress} key="Science" pageSize={pageSize} country="in" category="science" />} />
          <Route exact path="/sports" element={<News updateProgress={setProgress} key="Sports" pageSize={pageSize} country="in" category="sports" />} />
          <Route exact path="/technology" element={<News updateProgress={setProgress} key="Technology" pageSize={pageSize} country="in" category="technology" />} />
        </Routes>
      </Router>
    </div>
  )

}
export default App;
