import React from 'react';
import RealMe from '../../Images/real-me.jpg';
import './About.css';

const About = () => {
    return (
        <div className="custom-bgc custom-padding-top about-extra-padding-top" id="about">
            <div className="container custom-padding">
                <div className="row">
                    <div className="col-md-6 d-flex justify-content-center align-items-center">
                        <img className="about-me-img" src={RealMe} alt="Rafi Ferdos" />
                    </div>
                    <div className="col-md-6">
                        <h1 className="text-light fs-1 lightning-text">Introducing Myself</h1>
                        <hr className="horizontal-line" />
                        <p className="text-light custom-para">I am a MERN-Stack WEB Developer. I'm working with React.js, Node.js and MongoDB. I also have experience in developing static websites using HTML5, CSS3 and JavaScript (ES6). I am a quick learner and self-motivated programmer.I always work hard and smart to complete my everyday tasks quick and in fancy style. That's why I am always ready to accomplish any task by working hard. I always not only focus on learning new technology but also apply it in my creative projects. My goal is to become A World-Class Professional Web Developer.</p>
                        <br />
                        <h3 className="fs-3 text-light lightning-text">Technologies I'm working with:</h3>
                        <hr className="horizontal-line" />
                        <div className="text-light row">
                            <div className="col-md-12 mb-3">
                                <h4 className="ms-3 lightning-text">Frontend Development:</h4>
                                <ul className="frontend-tech-list">
                                    <li>JavaScript (ES6)</li>
                                    <li>React.js</li>
                                    <li>Redux</li>
                                    <li>Material UI</li>
                                    <li>HTML5</li>
                                    <li>CSS3</li>
                                    <li>Bootstrap 5</li>
                                    <li>Tailwind CSS</li>
                                    <li>Bootstrap 5</li>
                                </ul>
                            </div>
                            <div className="col-md-12 mb-3">
                                <h4 className="ms-3 lightning-text">Backend Development:</h4>
                                <ul className="backend-tech-list">
                                    <li>MongoDB</li>
                                    <li>NodeJS</li>
                                    <li>ExpressJS</li>
                                </ul>
                            </div>
                            <div className="col-md-12">
                                <h4 className="ms-3 lightning-text">Tools</h4>
                                <ul className="tools-list">
                                    <li>VS Code</li>
                                    <li>Git/Github</li>
                                    <li>Chrome Dev Tool</li>
                                    <li>NPM & YARN</li>
                                    <li>Firebase</li>
                                    <li>Netlify</li>
                                    <li>Heroku</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;