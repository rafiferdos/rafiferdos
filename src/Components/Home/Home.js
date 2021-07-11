import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "pathseg";
import React from 'react';
import Particles from 'react-particles-js';
import { Typewriter } from 'react-simple-typewriter';
import Me from '../../Images/me.png';
import './Home.css';
import Resume from '../../Images/resume-me.pdf'

const Home = () => {
    return (
        <div className="under-particle" id="home">
        <Particles
            className="particle-canvas" 
            params={{
                "particles":{
                    "number": {
                        "value": 25,
                        "density": {
                            "enable": true,
                            "value_area": 800
                        }
                    },
                    "color": {
                      "value": "#00d8d6"
                    },
                    "size": {
                        "value": 3
                    },
                },
                "interactivity":{
                    "events":{
                        "onhover":{
                            "enable": true,
                            "mode": "repulse"
                        }
                    }
                }
            }}
        ></Particles>
            <div className="container custom-padding-top">
                <div className="row">
                    <div className="col-md-6 main-font-color custom-padding">
                        <h3 className="custom-ff mb-5">Hello World!</h3>
                        <p className="mb-4 fs-4">I'm</p>
                        <h1><span className="name custom-fs">{"<"}Rafi Ferdos{"/>"}</span></h1>
                        <span className="fs-2" style={{color: "#fff", marginLeft: "10px"}}>
                            <Typewriter
                                loop
                                cursor
                                cursorStyle="_"
                                typeSpeed={100}
                                deleteSpeed={80}
                                delaySpeed={500}
                                words={["MERN-Stack Developer", "Web Developer", "JavaScript Developer", "React Developer", "Self-Motivated Programmer"]}
                            />
                        </span>
                        <p className="mt-5 fs-5 custom-para">A glowing & determined web developer. In today's world I am constantly developing my skills to keep up with the latest technology. I work hard to keep my confidence level up and make a fame in this modern world. I'm what I am.</p>
                        <button className="btn btn-custom" type="submit"><a className="resume" href={Resume}>Resume <FontAwesomeIcon icon={faDownload} /></a></button>
                    </div>
                    <div className="col-md-6 d-flex justify-content-center align-items-center">
                        <img className="img-fluid" src={Me} alt="Rafi Ferdos" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;