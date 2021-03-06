import React, { Component } from 'react';
import '../Styles/Rap.css';
import * as db from '../../dataStorage/datastore';
import AudioPlayer from './AudioPlayer';
import Countdown from "react-countdown";
import DiffRender from "../../Algorithm/DiffRender.jsx";
import mics from "../../images/mics.png";
import mic from "../../images/mic.png";
import restart from "../../images/restart.png";
import Leaderboard from './LeaderBoard';
import { getScore } from "../../Algorithm/textDiff.js";
const lyrics = require('../../lyrics.json');

class Rap extends Component  {
    state = { clicked: false, 
        starting: false, 
        firstStart: true,
        countdownStart: false,
        play: false,
        name: '',
        score: 0,
        completedRap: false,
        startedRecording: false,
        apiResponse: " ",
        firstTime: true,
        firstInput: " ",
        invalidName: false,
        timeSinceStart: 0,
        restarted: false
    }
    audio = new Audio("../../audio/test.mp3")

    handleStart = () => {

        // If clicked start and has a valid name
        if (!this.state.starting && this.state.name.trim() !== '') {
            this.playTwoBars();
        }
        else if (this.state.name.trim() === ''){
            this.setInvalid();
        }
    }

    // Let the two Bars begin, waiting for countdown to start
    playTwoBars = () => {
        this.setState({ 
            starting: true,
            restarted: false,
            firstStart: false
        })
        setTimeout(() => {
            this.setState({ countdownStart: true })
        }, 3000);
        setTimeout(() => {
            this.setState({ startedRecording: true, countdownStart: false })
            this.interval = setInterval(() => this.tickTime(), 50)
            this.setState({timeSinceStart: 0})
        }, 6000);
    }

    // if user clicks restart
    handleRestart = () => {
        this.setState({ 
            starting: false, 
            play: false,
            countdownStart: false,
            score: 0,
            apiResponse: " ",
            firstTime: true,
            firstInput: " ",
            timeSinceStart: 0,
            restarted: true,
            updatedDBAfter: true
        })
        clearInterval(this.interval);
    }

    tickTime = () => {
        this.setState({
            timeSinceStart: this.state.timeSinceStart + 0.05
        });
    }

    stop = () => { // ends rapping
        this.setState({
            starting: false, 
            play: false,
            countdownStart: false
        });
        setTimeout(() => {
            this.setState({ startedrecording: false })
        }, 3000);

        // Record score to database
        setTimeout(() => { 
            this.setState({ // Return a score as an integer
                score: Math.round(100 * getScore(lyrics.one, this.state.apiResponse))
            });
            db.addScore(this.state.name, this.state.score); 
        }, 4000);

        clearInterval(this.interval);
        this.setState({
            timeSinceStart: 0,
        });
    }

    async componentDidMount() {
        try {
            // speech to text api
            setInterval(async () => {
              if(this.state.startedRecording && !this.state.restarted ){
                    fetch("http://localhost:9000/STTApi")
                    .then(res => res.text())
                        .then(res => this.setState({apiResponse: this.state.apiResponse + res, firstInput: res}));
                    if(this.state.firstTime && this.state.firstInput !== " "){
                        this.setState({apiResponse: " ", firstTime: false});
                    }
                }
            }, 50);
        } catch(e) {
          console.log(e);
        }
      }

    renderer = ({ seconds, completed }) => {
        if (completed) {
          // Render a complete state
          this.setState({ play: true })
          return null;
        } else {
          // Render a countdown
          return (
            <span className={this.state.play ? 'no-countdown' : 'countdown'}>{seconds}</span>
          );
        }
    };

    // Updates name 
    newName = (event) => {
        if (!this.state.starting){
            this.setState({ name: event.target.value })
        }
    }

    // Checks if name is invalid
    setInvalid() {
        this.setState({ invalidName: true })
        setTimeout(() => { // Animation lasts 3 secs
          this.setState({ invalidName: false })
        }, 3000);
    }

    render() {
        return (
            <div className='wrapper'>
                <AudioPlayer visible={this.state.starting} stop={this.stop}/>
                <img className='mic'  alt= 'mic' src={mic} style={{width: '7rem'}}/>
                <input
                    type = 'text'
                    placeholder = 'Enter your name to play...'
                    value = {this.state.name} 
                    onChange = {this.newName}
                />
                <div className='invalid-name'>
                    {this.state.invalidName ? 'Please enter a name' : ' '}
                </div>
                <div className='sidebar-container'>
                    <div className='left-sidebar'>
                        <h2>Leaderboard</h2>
                        <Leaderboard/>
                    </div>
                    <div className="scroll" onClick={this.handleStart}>
                        <div className='lyrics-container'>
                            <div className={this.state.firstStart ? 'lyrics-blurred' : 'lyrics'}>
                                <DiffRender recorded = {lyrics.one} user = {this.state.apiResponse}/>
                            </div>
                            {this.state.countdownStart ?
                                <Countdown date={Date.now() + 3000} renderer={this.renderer} /> : null
                            }
                            <p className={this.state.starting ? 'started' : 'not-started'}>
                                Click to Start
                            </p>
                        </div>
                    </div>
                    <div className='right-sidebar'>
                        <h2>Progress Bar</h2>
                        <progress className='progress-bar' max='100' min='0' value={115*this.state.timeSinceStart/(18*3/4)}/>
                        <div className = "score">
                            <h2>Score:</h2>
                            <h1>{this.state.score}</h1>
                        </div>
                    </div>
                </div>
                <img src={restart} alt = 'restart' className='restart' onClick={this.handleRestart}/>
            </div>
        );
    }
}

export default Rap;