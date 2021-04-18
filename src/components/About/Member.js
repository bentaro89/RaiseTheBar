import React from 'react';
import '../Styles/About.css';

function Member(props) {
    return (
        <li className="member">
            <div className="profile">
                <figure className="pic-wrap">
                    <img className="pic" src={props.src} />
                </figure>
            </div>
        </li>
    )
}

export default Member;