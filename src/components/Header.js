import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Styles/Header.css';

class Header extends Component {
    state = { clicked: false }

    handleClick = () => {
        this.setState({ clicked: !this.state.clicked })
    }

    render() {
        return (
            <nav className="NavbarItems">
                <Link to="/" className='navbar-logo'>
                    Raise the Bar
                </Link>
                <div className="menu-icon" onClick={this.handleClick}>
                    <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}/>
                </div>
                <ul className={this.state.clicked ? 'navMenuActive' : 'navMenu'}>
                    <li className='nav-item'>
                        <Link to='/about' className='nav-links'>
                            About
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/rap' className='nav-links'>
                            Rap
                        </Link>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default Header;
