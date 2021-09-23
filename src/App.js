import "./App.css";
import React, { useEffect } from "react";
import Main from "./components/main/main";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import { BrowserRouter } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import avatar from './images/avatar.png'

function App() {
    const [shows, setShows] = useState([]);
    const [likedShows, setLikedShows] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [friendList, setFriendsList] = useState([]);
    const [peopleList, setPeopleList] = useState([
        {name: 'Igor', id: 1, email: 'igor@gmail.com',  photo: avatar},
        {name: 'Vasia', id: 2, email: 'vasia@gmail.com', photo: avatar},
        {name: 'Oleg', id: 3, email: 'oleg@gmail.com', photo: avatar},
        {name: 'Petr', id: 4, email: 'petr@gmail.com', photo: avatar}
      ]);
    const [isLogin, setIsLogin] = useState(false);
    const [isModalVisible, setModalVisible] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [sortMehod, setSortMethod] = useState('');


    async function getShows(shows) {
        if (shows.length) {
            return shows;
        }
        const response = await axios.get("https://api.tvmaze.com/shows");
        setShows(response.data);
    }

    useEffect(() => {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }, [isLogin, shows]);

    const addToFavorites = (newShow) => {
      if(!isLogin) {
        alert('please login');
        return;
      }
        setFavorites([...favorites, newShow]);
    };

    const removeFromFavorites = (show) => {
      setFavorites(favorites.filter(el => {
        return show.id !== el.id;
      }))
    }

    const likeShow = (show) => {
      if(!isLogin) {
        alert('please login');
        return;
      }
      setLikedShows([...likedShows, show]);
    }

    const dislikeShow = (show) => {
      setLikedShows(likedShows.filter(el => {
        return show.id !== el.id;
      }))
    }

    const addToFriends = (man) => {
      setFriendsList([...friendList, man]);
    }

    const removeFromFriends = (man) => {
      setFriendsList(friendList.filter(el => {
        return man.id !== el.id;
      }))
    }

    const sortShows = (method) => {
      setSortMethod(method)
      if(sortMehod === 'from-top') {
        setShows([...shows].sort((a,b) => a.rating.average - b.rating.average));
      } else if(sortMehod = 'from-down') {
        setShows([...shows].sort((a,b) => b.rating.average - a.rating.average));
      }
    }

    getShows(shows);

    return (
        <div className="App">
            <BrowserRouter>
                <Header isLogin={isLogin} setModalVisible={setModalVisible}/>
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
                />
                <Footer />
            </BrowserRouter>
        </div>
    );
}

export default App;
