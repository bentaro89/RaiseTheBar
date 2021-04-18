import React, { Component } from 'react';
import '../Styles/Rap.css';
import * as db from '../../dataStorage/datastore';
import AudioPlayer from './AudioPlayer';
import Countdown from "react-countdown";
import Leaderboard from './LeaderBoard';
const lyrics = require('../../lyrics.json');

class Rap extends Component  {
    state = { 
        starting: false, 
        play: false,
        name: '',
        score: 10,
        completedRap: false,
        
     }

    handleStart = () => {
        console.log(this.state.starting);
        if (!this.state.starting && this.state.name.trim() !== '') {
            this.setState({ starting: true })
        }
    }

    handleRestart = () => {
        this.setState({ 
            starting: false, 
            play: false
        })
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
            <div>
                <AudioPlayer />
                <input
                    type = 'text'
                    placeholder = 'Enter your name i.e Eminem'
                    value = {this.state.name} 
                    onChange = {this.newName}
                />
                <img src="/images/mic.png" alt= 'mic' style={{width: '7rem'}}/>
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
                <img src="/images/restart.png" alt='restart'className='restart' onClick={this.handleRestart}/>
                <Leaderboard/>
            </div>
        );
    }
}

export default Rap;