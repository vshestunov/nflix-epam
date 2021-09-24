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
                            addToFavorites={props.addToFavorites}
                            favorites={props.favorites}
                            removeFromFavorites={props.removeFromFavorites}
                            likedShows={props.likedShows}
                            likeShow={props.likeShow}
                            dislikeShow={props.dislikeShow}
                            isModalVisible={props.isModalVisible}
                            setModalVisible={props.setModalVisible}
                            isLogin={props.isLogin}
                            isLoading={props.isLoading}
                            sortShows={props.sortShows}
                            sortMethod={props.sortMethod}
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
                            addToFriends={props.addToFriends}
                            removeFromFriends={props.removeFromFriends}
                            friendList={props.friendList}
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
                            removeFromFriends={props.removeFromFriends}
                            friendList={props.friendList}
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
                            favorites={props.favorites}
                            removeFromFavorites={props.removeFromFavorites}
                            isLogin={props.isLogin}
                            isModalVisible={props.isModalVisible}
                            setModalVisible={props.setModalVisible}
                        />
                    )}
                />
                <Route exact path="/profile"  render={() => <Profile setIsLogin={props.setIsLogin} isLoading={props.isLoading} />} />
                <Route exact path='/login' render={() => <Login setIsLogin={props.setIsLogin} isLoading={props.isLoading} />} />
                <Route exact path="/" render={() => <Home />} />
            </div>
        </div>
    );
};

export default Main;
