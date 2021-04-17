import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import * as db from './dataStorage/datastore';
import './App.css';
import DiffRender from './Algorithm/DiffRender.jsx'

import Header from './components/Header';
import Landing from './components/Landing/Landing';
import About from './components/About/About';
import Leaderboard from './components/Leaderboard/Leaderboard';
import Rap from './components/Rap/Rap';
import AudioPlayer from './components/Audio/AudioPlayer'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      test1: "test it!",
      apiResponse: "",
    }
  }
  //Repeatedly call API to obtain most recent microphone input 
  async componentDidMount() {
    try {
      setInterval(async () => {
        
        fetch("http://localhost:9000/STTApi")
          .then(res => res.text())
            .then(res => this.setState({apiResponse: res}));
      }, 50);
    } catch(e) {
      console.log(e);
    }
  }

  render (){
    return(
    <div className="App">
    <header className="App-header">
      <Router>
        <Header/>
        <AudioPlayer />
        {/* <p>{this.state.apiResponse}</p> */}
        <Switch>
          <Route path='/' exact component={Landing} />
          <Route path='/about' exact component={About} />
          <Route path='/rap' exact component={Rap} />
          <Route path='/leaderboard' exact component={Leaderboard} />
        </Switch>
      </Router>
    </header>
  </div>
    );
  }
   
}

export default App;
