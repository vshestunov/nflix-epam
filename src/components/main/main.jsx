import React from "react";
import { Route } from "react-router-dom";
import Friends from "./friends/friends";
import People from "./people/people";
import Favorites from "./favorites/favorites";
import Profile from "./profile/profile";
import Home from "./home/home";
import Shows from "./shows/shows";
import "./main.css";
import Show from "./shows/show";
import Login from "./login/login";
import Recommendations from "./recomendations/recomendations";

const Main = (props) => {
    
    return (
        <div className="main">
            <div className="main-cont">
                <Route
                    exact
                    path="/shows"
                    render={() => (
                        <Shows
                            shows={props.shows}
                            likedShows={props.likedShows}
                            setLikedShows={props.setLikedShows}
                            isModalVisible={props.isModalVisible}
                            setModalVisible={props.setModalVisible}
                            isLogin={props.isLogin}
                            isLoading={props.isLoading}
                            sortMehod={props.sortMehod}
                            setSortMethod={props.setSortMethod}
                            searchQuery={props.searchQuery}
                            setSearchQuery={props.setSearchQuery}
                            selectedFilter={props.selectedFilter}
                            setSelectedFilter={props.setSelectedFilter}
                            genres={props.genres}
                        />
                    )}
                />
                <Route exact path="/shows/:id" render={() => <Show />} />
                <Route
                    exact
                    path="/people"
                    render={() => (
                        <People
                            peopleList={props.peopleList}
                            isLogin={props.isLogin}
                            isModalVisible={props.isModalVisible}
                            setModalVisible={props.setModalVisible}
                        />
                    )}
                />
                <Route
                    exact
                    path="/friends"
                    render={() => (
                        <Friends
                            isLogin={props.isLogin}
                            isModalVisible={props.isModalVisible}
                            setModalVisible={props.setModalVisible}
                        />
                    )}
                />
                <Route
                    exact
                    path="/favorites"
                    render={() => (
                        <Favorites
                            removeFromFavorites={props.removeFromFavorites}
                            isLogin={props.isLogin}
                            isModalVisible={props.isModalVisible}
                            setModalVisible={props.setModalVisible}
                        />
                    )}
                />
                <Route
                    exact
                    path="/recommendations"
                    render={() => (
                        <Recommendations
                            isLogin={props.isLogin}
                            isModalVisible={props.isModalVisible}
                            setModalVisible={props.setModalVisible}
                        />
                    )}
                />
                <Route exact path="/profile"  render={() => <Profile setIsLogin={props.setIsLogin} isLogin={props.isLogin} isLoading={props.isLoading} />} />
                <Route exact path='/login' render={() => <Login setIsLogin={props.setIsLogin} isLogin={props.isLogin} isLoading={props.isLoading} />} />        
                <Route exact path="/" render={() => <Home />} />
            </div>
        </div>
    );
};

export default Main;
