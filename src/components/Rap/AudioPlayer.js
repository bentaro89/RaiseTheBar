import React, { Component } from 'react';
import ReactAudioPlayer from 'react-audio-player'

import mp3_file from '../../audio/RealBeat1-1.mp3'
class AudioPlayer extends Component  {

    render() {
        if(this.props.visible){
            return (
                <div className = 'audio'>
                <ReactAudioPlayer src={mp3_file} autoPlay onEnded={this.props.stop}/>
                </div>
            );
        }
        else{
            return <div></div>
        }
    }
}

export default AudioPlayer;