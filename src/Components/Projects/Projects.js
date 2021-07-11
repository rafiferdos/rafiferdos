import React from 'react';
import './Projects.css'
import ETCShop from '../../Images/etc-shop.png'
import RailRover from '../../Images/rail-rover.png'
import SoccerClub from '../../Images/soccer-club.png'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode } from '@fortawesome/free-solid-svg-icons';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

const Projects = () => {
    return (
        <div className="custom-padding-top" id="projects">
            <h1 className="text-white text-center mb-5 lightning-text">Few of my projects</h1>
            <div className="project-cards container">
                <div class="row row-cols-1 row-cols-md-3 g-4">
                    <div class="col">
                        <div class="card h-100">
                            <div className="item-zoom">
                                <img src={ETCShop} class="card-img-top" alt="..."/>
                            </div>
                        <div class="card-body">
                            <h5 class="card-title">ETC Shop</h5>
                            <p class="card-text">A full-stack single-page e-commerce electronic web app. Login system with firebase and private routes. Users can buy products and see their purchase records on the order page. Admin panel, where admin can do CRUD operations.</p>
                        </div>
                        <div class="card-footer">
                            <div className="buttons">
                                <button className="btn btn-custom me-3">Live Site <FontAwesomeIcon icon={faExternalLinkAlt} /></button>
                                <button className="btn btn-custom">Code <FontAwesomeIcon icon={faCode} /></button>
                            </div>
                            <br />
                            <small class="text-muted">Created on May, 2021</small>
                        </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="card h-100">
                            <div className="item-zoom">
                                <img src={RailRover} class="card-img-top" alt="..."/>
                            </div>
                        <div class="card-body">
                            <h5 class="card-title">Rail Rover</h5>
                            <p class="card-text">A single-page e-tickets booking web app with firebase login system. There is a dynamic Google Map on the booking page.</p>
                        </div>
                        <div class="card-footer">
                            <div className="buttons">
                                <button className="btn btn-custom me-3">Live Site <FontAwesomeIcon icon={faExternalLinkAlt} /></button>
                                <button className="btn btn-custom">Code <FontAwesomeIcon icon={faCode} /></button>
                            </div>
                            <br />
                            <small class="text-muted">Created on April, 2021</small>
                        </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="card h-100">
                            <div className="item-zoom">
                                <img src={SoccerClub} class="card-img-top" alt="..."/>
                            </div>
                        <div class="card-body">
                            <h5 class="card-title">Soccer Club</h5>
                            <p class="card-text">This is a simple website about soccer team details. Created with React and React Router. It shows team details and image and other things dynamically.</p>
                        </div>
                        <div class="card-footer">
                            <div className="buttons">
                                <button className="btn btn-custom me-3">Live Site <FontAwesomeIcon icon={faExternalLinkAlt} /></button>
                                <button className="btn btn-custom">Code <FontAwesomeIcon icon={faCode} /></button>
                            </div>
                            <br />
                            <small class="text-muted">Created on February, 2021</small>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="see-more-button w-100 text-center mt-5 mb-5">
                <button className="btn btn-custom text center"><Link className="see-more-btn" to="/projects">See More</Link></button>
            </div>
        </div>
    );
};

export default Projects;