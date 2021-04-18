import React, { Component } from 'react';
import '../Styles/Rap.css';
import * as db from '../../dataStorage/datastore';
import AudioPlayer from './AudioPlayer';
import Countdown from "react-countdown";
import mics from "../../images/mics.png";
import restart from "../../images/restart.png";
import Leaderboard from './LeaderBoard';
const lyrics = require('../../lyrics.json');

class Rap extends Component  {
    state = { clicked: false, 
        starting: false, 
        play: false,
        name: '',
        score: 10,
        completedRap: false,
        startedRecording: false,
        apiResponse: " ",
        firstTime: true,
        name: '',
        firstInput: " "
    }
    audio = new Audio("../../audio/test.mp3")

    handleStart = () => {
        console.log(this.state.starting);
        if (!this.state.starting && this.state.name.trim() !== '') {
            this.setState({ starting: true })
        }
    }

    handleRestart = () => {
        this.setState({ 
            starting: false, 
            play: false,
            apiResponse: " ",
            firstTime: true,
            firstInput: " ",
        })
    }

    start = () => {
        this.setState({startedRecording: true})
    }

    stop = () => {
        this.setState({startedRecording: false})
    }
    async componentDidMount() {
        try {
            setInterval(async () => {
              if(this.state.startedRecording){
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
          db.addScore(this.state.name, this.state.score)
          return null;
        } else {
          // Render a countdown
          return (
            <span className={this.state.play ? 'no-countdown' : 'countdown'}>{seconds}</span>
          );
        }
    };

    newName = (event) => {
        if (!this.state.starting){
            this.setState({ name: event.target.value })
        }
    }

    render() {
        return (
            <div className='wrapper'>
                <AudioPlayer visible={this.state.play} start={this.start} stop={this.stop}/>
                <p>{this.state.apiResponse}</p>
                <img className='mic'  alt= 'mic' src="/images/mic.png" style={{width: '7rem'}}/>
                <input
                    type = 'text'
                    placeholder = 'Enter your name to play...'
                    value = {this.state.name} 
                    onChange = {this.newName}
                />
                <img src={mics} style={{width: '7rem'}}/>
                <div class="scroll" onClick={this.handleStart}>
                    <div className='lyrics-container'>
                        <p className={this.state.play ? 'lyrics' : 'lyrics-blurred'}>
                            {lyrics.one}
                        </p>
                        {this.state.starting ?
                            <Countdown date={Date.now() + 3000} renderer={this.renderer} /> : null
                        }
                        <p className={this.state.starting ? 'started' : 'not-started'}>
                            Click to Start
                        </p>
                    </div>
                </div>
                <img src={restart} className='restart' onClick={this.handleRestart}/>
                <Leaderboard/>
            </div>
        );
    }
}

export default Rap;