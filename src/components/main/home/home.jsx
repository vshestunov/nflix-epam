import React from "react";
import { NavLink } from "react-router-dom";
import "./home.css";

const Home = (props) => {
    return (
        <div className="home">
            <div className="headers-cont">
                <h1>Welcome to my like-a-netflix service</h1>
                <h2>
                    Feel free to use the navigation bar at the header and go
                    throw the App ;){" "}
                </h2>
                <h3>My service has such features:</h3>
            </div>
            <div className="features-cont">
                <h4>
                    On <NavLink to="/shows">SHOWS</NavLink> page
                </h4>
                <ul>
                    <li>Uploads the shows from API</li>
                    <li>You can SORT, FILTER and SEARCH shows</li>
                    <li>
                        You can LIKE shows from different accounts and see
                        result from any account
                    </li>
                    <li>You can add/remove shows to FAVORITES</li>
                    <li>You can share shows with your FRIENDS</li>
                </ul>
            </div>
            <div className="features-cont">
                <h4>
                    On <NavLink to="/favorites">FAVORITES</NavLink> page
                </h4>
                <ul>
                    <li>
                        Look at your favorite shows and remove them from this
                        list
                    </li>
                </ul>
            </div>
            <div className="features-cont">
                <h4>
                    On <NavLink to="/friends">FRIENDS</NavLink> page
                </h4>
                <ul>
                    <li>Look at your friends and remove them from this list</li>
                </ul>
            </div>
            <div className="features-cont">
                <h4>
                    On <NavLink to="/friends">FRIENDS</NavLink> page
                </h4>
                <ul>
                    <li>Look at your friends and remove them from this list</li>
                </ul>
            </div>
            <div className="features-cont">
                <h4>
                    On <NavLink to="/recommendations">RECOMMENDATIONS</NavLink>{" "}
                    page
                </h4>
                <ul>
                    <li>
                        Look at shows which other users (for whom you are a
                        friend) recommended to you
                    </li>
                </ul>
            </div>

            <div className="features-cont">
                <h4>
                    On <NavLink to="/profile">PROFILE</NavLink> and{" "}
                    <NavLink to="/login">LOGIN</NavLink> pages{" "}
                </h4>
                <ul>
                    <li>You can register a new account</li>
                    <li>You can login/logout to your existing account</li>
                </ul>
            </div>
        </div>
    );
};

export default Home;
