import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Landing.css';

class Landing extends Component  {
    render() {
        return (
            <div className='home-content'>
                <h3 className='intro-text'>add some kind of text here</h3>
                <h1 className='main-text'>ENTER TEXT ABOUT THIS WEBSITE</h1>
                <Link to='/rap' className='try'>
                    Try it out >>
                </Link>
            </div>
        );
    }
}

export default Landing;