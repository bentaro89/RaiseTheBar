import React, { Component } from 'react';
import '../Styles/Rap.css';
import AudioPlayer from './AudioPlayer'
import Countdown from "react-countdown";
const lyrics = require('../../lyrics.json');

class Rap extends Component  {
    state = { clicked: false, 
        starting: false, 
        play: false,
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
                    if(this.state.firstTime && this.state.firstInput != " "){
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

    newName = (event) => {
        if (!this.state.starting){
            this.setState({ name: event.target.value })
        }
    }

    render() {
        return (
            <div>
                <AudioPlayer visible={this.state.play} start={this.start} stop={this.stop}/>
                <p>{this.state.apiResponse}</p>
                <input
                    type = 'text'
                    placeholder = 'Enter your name i.e Eminem'
                    value = {this.state.name} 
                    onChange = {this.newName}
                />
                <img src="/images/mic.png" style={{width: '7rem'}}/>
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
                <img src="/images/restart.png" className='restart' onClick={this.handleRestart}/>
            </div>
        );
    }
}

export default Rap;