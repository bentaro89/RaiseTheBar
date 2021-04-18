import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import * as db from './dataStorage/datastore';
import './App.css';
import Header from './components/Header';
import Landing from './components/Landing/Landing';
import About from './components/About/About';
import Rap from './components/Rap/Rap';
const lyrics = require('./lyrics.json');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      test1: "test it!",
      apiResponse: "initial",
      startedRecording: false,
    }
    console.log(lyrics.one); // Get the first verse of lyrics
  }
  //Repeatedly call API to obtain most recent microphone input 
  start = () => {
    this.setState({startedRecording: !this.state.startedRecording})
  }

  render (){
    return(
    <div className="App">
    <header className="App-header">
      <Router>
        <Header/>
        {/* <p>{this.state.apiResponse}</p> */}
        <Switch>
          <Route path='/' exact component={Landing} />
          <Route path='/about' exact component={About} />
          <Route path='/rap' exact component={Rap} />
          {/* <Route path='/leaderboard' exact component={Leaderboard} /> */}
        </Switch>
      </Router>
    </header>
  </div>
    );
  }
   
}

export default App;
