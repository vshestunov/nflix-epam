import "./App.css";
import React, { useEffect, useMemo, useState } from "react";
import Main from "./components/main/main";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import avatar from "./images/avatar.png";

function App() {
    const [shows, setShows] = useState([]);
    const [genres, setGenres] = useState([]);
    const [likedShows, setLikedShows] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [friendList, setFriendsList] = useState([]);
    const [peopleList, setPeopleList] = useState([
        { name: "Igor", id: 1, email: "igor@gmail.com", photo: avatar },
        { name: "Vasia", id: 2, email: "vasia@gmail.com", photo: avatar },
        { name: "Oleg", id: 3, email: "oleg@gmail.com", photo: avatar },
        { name: "Petr", id: 4, email: "petr@gmail.com", photo: avatar },
    ]);
    const [isLogin, setIsLogin] = useState(false);
    const [isModalVisible, setModalVisible] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    let [sortMehod, setSortMethod] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedFilter, setSelectedFilter] = useState("");

    useEffect(async function() {
        const response = await axios.get("https://api.tvmaze.com/shows");
        setShows(response.data);
    }, []);

    useEffect(() => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 200);
    }, [isLogin]);

    const addToFavorites = (newShow) => {
        setFavorites([...favorites, newShow]);
    };

    const removeFromFavorites = (show) => {
        setFavorites(
            favorites.filter((el) => {
                return show.id !== el.id;
            })
        );
    };

    const likeShow = (show) => {
        setLikedShows([...likedShows, show]);
    };

    const dislikeShow = (show) => {
        setLikedShows(
            likedShows.filter((el) => {
                return show.id !== el.id;
            })
        );
    };

    const addToFriends = (man) => {
        setFriendsList([...friendList, man]);
    };

    const removeFromFriends = (man) => {
        setFriendsList(
            friendList.filter((el) => {
                return man.id !== el.id;
            })
        );
    };

    const sortedShows = useMemo(() => {
        if (sortMehod === "rating, from-top") {
            return [...shows].sort(
                (a, b) => b.rating.average - a.rating.average
            );
        } else if (sortMehod === "rating, from-down") {
            return [...shows].sort(
                (a, b) => a.rating.average - b.rating.average
            );
        } else if (sortMehod === "time, from-top") {
            return [...shows].sort(
                (a, b) => b.averageRuntime - a.averageRuntime
            );
        } else if (sortMehod === "time, from-down") {
            return [...shows].sort(
                (a, b) => a.averageRuntime - b.averageRuntime
            );
        } else if (!sortMehod) {
            return shows;
        }
    }, [shows, sortMehod]);

    const filteredAndSortedShows = useMemo(() => {
        if (!selectedFilter) {
            return sortedShows;
        }
        return sortedShows.filter((show) => {
            return show.genres.includes(selectedFilter);
        });
    }, [selectedFilter, sortedShows]);

    const sortedAndFilteredAndSearchedShows = useMemo(() => {
        return filteredAndSortedShows.filter((show) => {
            return show.name.toLowerCase().includes(searchQuery);
        });
    }, [filteredAndSortedShows, searchQuery]);

    return (
        <div className="App">
            <BrowserRouter>
                <Header isLogin={isLogin} setModalVisible={setModalVisible} />
                <Main
                    shows={sortedAndFilteredAndSearchedShows}
                    favorites={favorites}
                    addToFavorites={addToFavorites}
                    removeFromFavorites={removeFromFavorites}
                    likeShow={likeShow}
                    dislikeShow={dislikeShow}
                    likedShows={likedShows}
                    friendList={friendList}
                    addToFriends={addToFriends}
                    removeFromFriends={removeFromFriends}
                    peopleList={peopleList}
                    isLogin={isLogin}
                    setIsLogin={setIsLogin}
                    isModalVisible={isModalVisible}
                    setModalVisible={setModalVisible}
                    isLoading={isLoading}
                    sortMehod={sortMehod}
                    setSortMethod={setSortMethod}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    selectedFilter={selectedFilter}
                    setSelectedFilter={setSelectedFilter}
                    genres={genres}
                />
                <Footer />
            </BrowserRouter>
        </div>
    );
}

export default App;
