import React, { Component } from 'react';
import * as db from './dataStorage/datastore';
import logo from './logo.svg';
import './App.css';
import DiffRender from './Algorithm/DiffRender.jsx'

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
    db.addDog(this.state.test1); // Test for database!

    return(
    <div className="App">
    <header className="App-header">
      <p>{this.state.apiResponse}</p>
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        Edit <code>src/App.js</code> and save to reload.
      </p>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
    </header>
  </div>
    );
  }
   
}

export default App;
