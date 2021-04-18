import React, { Component } from 'react';
import '../Styles/About.css';
import Member from './Member';

import adrienne from '../../images/adrienne.jpg';
import andy from '../../images/andy.jpg';
import benny from '../../images/benny.jpg';
import camden from '../../images/camden.jpg';

class About extends Component  {
    render() {
        return (
            <div>
                <p className="intro-text">We are a group of Dartmouth Students</p>
                <p className="main-text">About the Developers</p>
                <div className='team_container'>
                    <ul className='team_members'>
                        <div className='member-intro'>
                            <Member src={adrienne}/>
                            <h2>Adrienne Ko</h2>
                        </div>
                        <div className='member-intro'>
                            <p>
                                My name is Ben.
                            </p>
                            <Member src={benny}/>
                        </div>
                        <div className='member-intro'>
                            <Member src={andy}/>
                            <p>
                                My name is Andy.
                            </p>
                        </div>
                        <div className='member-intro'>
                            <p>
                                My name is Camden.
                            </p>
                            <Member src={camden}/>
                        </div>
                    </ul>
                </div>
            </div>
        );
    }
}

export default About;