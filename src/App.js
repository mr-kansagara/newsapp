import './App.css';

import React, { Component } from 'react'
import Navbar from './Components/Navbar';
import News from './Components/News';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  pageSize = 9
  state = {
    progress: 0
  }

  setProgress = (progress) => {
    this.setState({ progress: progress })
  }
  render() {

    return (
      <div>
        <Router>
          <LoadingBar
            color='#f11946'
            height={5}
            progress={this.state.progress}
          />
          <Navbar />
          <Routes>
            <Route exact path="/" element={<News setProgress={this.setProgress} key="Home" pageSize={this.pageSize} country="in" category="general" />} />
            <Route exact path="/business" element={<News setProgress={this.setProgress} key="Business" pageSize={this.pageSize} country="in" category="business" />} />
            <Route exact path="/entertainment" element={<News setProgress={this.setProgress} key="Entertainment" pageSize={this.pageSize} country="in" category="entertainment" />} />
            <Route exact path="/general" element={<News setProgress={this.setProgress} key="General" pageSize={this.pageSize} country="in" category="general" />} />
            <Route exact path="/health" element={<News setProgress={this.setProgress} key="Health" pageSize={this.pageSize} country="in" category="health" />} />
            <Route exact path="/science" element={<News setProgress={this.setProgress} key="Science" pageSize={this.pageSize} country="in" category="science" />} />
            <Route exact path="/sports" element={<News setProgress={this.setProgress} key="Sports" pageSize={this.pageSize} country="in" category="sports" />} />
            <Route exact path="/technology" element={<News setProgress={this.setProgress} key="Technology" pageSize={this.pageSize} country="in" category="technology" />} />
          </Routes>
        </Router>
      </div>
    )
  }
}