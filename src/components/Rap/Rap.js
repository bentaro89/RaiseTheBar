import React, { Component } from 'react';
import '../Styles/Rap.css';
import AudioPlayer from './AudioPlayer'
import Countdown from "react-countdown";
const lyrics = require('../../lyrics.json');

class Rap extends Component  {
    state = { starting: false, play: false }

    handleStart = () => {
        console.log(this.state.starting);
        if (!this.state.starting) {
            this.setState({ starting: true })
        }
    }

    handleRestart = () => {
        this.setState({ starting: false, play: false })
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

    render() {
        return (
            <div>
                <AudioPlayer />
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