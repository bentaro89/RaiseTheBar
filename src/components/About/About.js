import React, { Component } from 'react';
import '../Styles/About.css';

import adrienne from '../../images/adrienne.jpg';
import andy from '../../images/andy.jpg';
import benny from '../../images/benny.jpg';
import camden from '../../images/camden.jpg';

class About extends Component  {
    render() {
        return (
            <div>
                <p className="main-text">About the Developers</p>
                <p className="intro-text">We are a group of Dartmouth Students</p>
                <div className="grid2x2">
                <div className="box box1"><img src={adrienne}/></div>
                <div className="box box2"><img src={benny}/></div>
                <div className="box box3"><img src={andy}/></div>
                <div className="box box4"><img src={camden}/></div>
                </div>
            </div>
        );
    }
}

export default About;