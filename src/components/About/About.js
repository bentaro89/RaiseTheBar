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
            <div className='about'>
                <p className="about-intro">
                    Welcome to our website!<br/>
                    We are a group of students at Dartmouth College.
                </p>
                <p className="main-heading">Meet the Team</p>
                <div className='team_container'>
                    <ul className='team_members'>
                        <div className='member-intro'>
                            <Member src={adrienne}/>
                            <div className='info'>
                                <h2>Adrienne Ko</h2>
                                <p>
                                    <b>Year:</b> 2023<br/>
                                    <b>Hometown:</b> New York City<br/>
                                    <b>Major:</b> Computer Science<br/>
                                    <b>Main role:</b> Front end
                                </p>
                            </div>
                        </div>
                        <div className='member-intro'>
                            <div className='info'>
                                <h2>Benedict Tedjokusumo</h2>
                                <p>
                                    <b>Year:</b> 2023<br/>
                                    <b>Hometown:</b> San Francisco<br/>
                                    <b>Major:</b> Computer Science<br/>
                                    <b>Main role:</b> Backend, Database
                                </p>
                            </div>
                            <Member src={benny}/>
                        </div>
                        <div className='member-intro'>
                            <Member src={andy}/>
                            <div className='info'>
                                <h2>Andy Kotz</h2>
                                <p>
                                    <b>Year:</b> 2024<br/>
                                    <b>Hometown:</b> New Hampshire<br/>
                                    <b>Major:</b> Computer Science<br/>
                                    <b>Main role:</b> Backend, Algorithm
                                </p>
                            </div>
                        </div>
                        <div className='member-intro'>
                            <div className='info'>
                                <h2>Camden Hao</h2>
                                <p>
                                    <b>Year:</b> 2023<br/>
                                    <b>Hometown:</b> Virginia<br/>
                                    <b>Major:</b> Computer Science<br/>
                                    <b>Main role:</b> Backend, API
                                </p>
                            </div>
                            <Member src={camden}/>
                        </div>
                    </ul>
                </div>
            </div>
        );
    }
}

export default About;