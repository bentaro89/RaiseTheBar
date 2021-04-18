import React, { Component } from 'react';
import ReactAudioPlayer from 'react-audio-player'

import mp3_file from '../../audio/test.mp3'

class AudioPlayer extends Component  {
    render() {
        return (
            <div className = 'audio'>
              <ReactAudioPlayer src={mp3_file} controls/>
            </div>
        );
    }
}

export default AudioPlayer;