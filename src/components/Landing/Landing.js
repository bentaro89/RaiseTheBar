import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Landing.css';
import mic from '../../images/mic.png';
class Landing extends Component  {
    render() {
        return (
            <div className='home-content'>
                <div className='text'>
                    <h3 className='intro-text'>How good is your rapping?</h3>
                    <h1 className='main-text'>SPIT SOME FIRE</h1>
                    <Link to='/rap' className='try'>
                        Try it out >>
                    </Link>
                </div>
                <img className='mics' src={mic}/>
            </div>
        );
    }
}

export default Landing;