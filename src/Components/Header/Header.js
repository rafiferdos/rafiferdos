import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-scroll';
import Logo from '../../Images/logo.png';
import Resume from '../../Images/resume-me.pdf';
import './Header.css';

const Header = () => {
    return (
            <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark fs-5">
                <div className="container-fluid container-custom">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <a className="navbar-brand" href="/"><img className="logoImg" src={Logo} alt="Rafi Ferdos Logo" /></a>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                        <ul className="navbar-nav ms-auto me-5 mb-2 mb-lg-0">
                            <li className="nav-item">
                            <Link to="home" smooth={true} className="nav-link" aria-current="page" href="/">Home</Link>
                            </li>
                            <li className="nav-item">
                            <Link to="about" smooth={true} className="nav-link" href="/">About</Link>
                            </li>
                            <li className="nav-item">
                            <Link to="projects" smooth={true} className="nav-link" href="/">Projects</Link>
                            </li>
                            <li className="nav-item">
                            <Link to="posts" smooth={true} className="nav-link disabled" href="/" tabindex="-1" aria-disabled="true">Posts</Link>
                            </li>
                            <li className="nav-item">
                            <Link to="contact" smooth={true} className="nav-link" href="/">Contact</Link>
                            </li>
                        </ul>
                        <div className="d-flex">
                            <button className="btn btn-custom" type="submit"><a className="resume" href={Resume}>Resume <FontAwesomeIcon icon={faDownload} /></a></button>
                        </div>
                    </div>
                </div>
            </nav>
);
};

export default Header;