import "./App.css";
import React, { useEffect } from "react";
import Main from "./components/main/main";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import { BrowserRouter } from "react-router-dom";
import { useState } from "react";
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
    const [selectedFilter, setSelectedFilter] = useState('');


    async function getShows(shows) {
        if (shows.length) {
            return shows;
        }
        const response = await axios.get("https://api.tvmaze.com/shows");
        setShows(response.data);
    }

    async function getGenres(genres) {
      if (genres.length) {
          return genres;
      }
      const response = await axios.get("https://api.tvmaze.com/shows");
      let genresArr = [];
      response.data.map(show => {
          show.genres.map(genre => {
              genresArr.push(genre);
          })
      })
      let genresSet = [... new Set(genresArr)];
      let genresOptions = [];
      genresSet.map(genre => genresOptions.push({value: genre, name: genre}));
      setGenres(genresOptions);
  }

    getGenres(genres);

    useEffect(() => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 200);
    }, [isLogin, shows]);

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

    const sortShows = (method) => {
        setSortMethod(method);
        if (method === "rating, from-top") {
            setShows(
                [...shows].sort((a, b) => b.rating.average - a.rating.average)
            );
        } else if (method === "rating, from-down") {
            setShows(
                [...shows].sort((a, b) => a.rating.average - b.rating.average)
            );
        } else if (method === "time, from-top") {
            setShows(
                [...shows].sort((a, b) => b.averageRuntime - a.averageRuntime)
            );
        } else if (method === "time, from-down") {
            setShows(
                [...shows].sort((a, b) => a.averageRuntime - b.averageRuntime)
            );
        }
    };

    useEffect(() => {
      setShows([...shows].filter(show => {
        return show.genres.includes(selectedFilter);
      }))
    }, [selectedFilter])

    getShows(shows);

    return (
        <div className="App">
            <BrowserRouter>
                <Header isLogin={isLogin} setModalVisible={setModalVisible} />
                <Main
                    shows={shows}
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
                    sortShows={sortShows}
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
