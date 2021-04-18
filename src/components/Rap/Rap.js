import React, { Component } from 'react';
import '../Styles/Rap.css';
import AudioPlayer from './AudioPlayer'
import Countdown from "react-countdown";

class Rap extends Component  {
    state = { clicked: false, 
        starting: false, 
        play: false,
        startedRecording: false,
        apiResponse: " ",
        firstTime: true,
    }
    audio = new Audio("../../audio/test.mp3")

    handleStart = () => {
        console.log(this.state.starting);
        if (!this.state.starting) {
            this.setState({ clicked: true, starting: true })
        }
    }

    handleRestart = () => {
        this.setState({ clicked: false, starting: false, play: false })
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
                        .then(res => this.setState({apiResponse: this.state.apiResponse + res}));
                    if(this.state.firstTime && this.state.apiResponse != " "){
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

    render() {
        return (
            <div>
                <AudioPlayer visible={this.state.play} start={this.start} stop={this.stop}/>
                <p>{this.state.apiResponse}</p>
                <p>{this.state.firstTime.toString()}</p>
                <img src="/images/mic.png" style={{width: '7rem'}}/>
                <div class="scroll" onClick={this.handleStart}>
                    <div className='lyrics-container'>
                        <p className={this.state.play ? 'lyrics' : 'lyrics-blurred'}>
                            Dear old Dartmouth, give a rouse
                            For the College on the hill,
                            For the Lone Pine above her,
                            And the loyal ones who love her.
                            Give a rouse, give a rouse, with a will!
                            For the sons of old Dartmouth,
                            For the daughters of Dartmouth.
                            Though ‘round the girdled Earth they roam,
                            Her spell on them remains.
                            They have the still North in their hearts,
                            The hill winds in their veins,
                            And the granite of New Hampshire
                            In their muscles and their brains.
                            And the granite of New Hampshire
                            In their muscles and their brains.

                            Dear old Dartmouth, set a watch,
                            Lest the old traditions fail.
                            Stand as sister stands by brother.
                            Dare a deed for the old mother.
                            Greet the world from the hills with a hail!
                            For the sons of old Dartmouth,
                            For the daughters of Dartmouth.
                            Around the world they keep for her
                            Their old undying faith.
                            They have the still North in their soul,
                            The hill winds in their breath,
                            And the granite of New Hampshire
                            Is made part of them ‘til death.
                            And the granite of New Hampshire
                            Is made part of them ‘til death.
                        </p>
                        {this.state.starting ?
                            <Countdown date={Date.now() + 3000} renderer={this.renderer} /> : null
                        }
                        <p className={this.state.clicked ? 'started' : 'not-started'}>
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