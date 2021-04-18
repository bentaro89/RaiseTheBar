import React, { Component } from 'react';
import '../Styles/Rap.css';
import AudioPlayer from './AudioPlayer'
import Countdown from "react-countdown";

class Rap extends Component  {
    state = { clicked: false, starting: false, play: false }

    handleStart = () => {
        console.log(this.state.starting);
        if (!this.state.starting) {
            this.setState({ clicked: true, starting: true })
        }
    }

    handleRestart = () => {
        this.setState({ clicked: false, starting: false, play: false })
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