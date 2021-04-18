import React, { Component } from 'react';
import ReactAudioPlayer from 'react-audio-player'

import mp3_file from '../../audio/RealBeat1-1.mp3'
class AudioPlayer extends Component  {
    render() {
        return (
            <div className = 'audio'>
              <ReactAudioPlayer src={mp3_file} controls onPlay={this.props.start} onEnded={this.props.start} onPause={this.props.start}/>
            </div>
        );
    }
}

export default AudioPlayer;