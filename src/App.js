import "./App.css";
import React, { useEffect, useMemo, useState } from "react";
import Main from "./components/main/main";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import { getFirestore, collection, getDocs, setDoc, doc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function App() {
    const [shows, setShows] = useState([]);
    const [genres, setGenres] = useState([]);
    const [likedShows, setLikedShows] = useState([]);
    const [peopleList, setPeopleList] = useState([]);
    const [isLogin, setIsLogin] = useState(false);
    const [isModalVisible, setModalVisible] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    let [sortMehod, setSortMethod] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedFilter, setSelectedFilter] = useState("");
    const db = getFirestore();


    const auth = getAuth();
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if(user) {
                (async () => {
                    const querySnapshot = await getDocs(collection(db, "users"));
                    let arr = [];
                    querySnapshot.forEach((doc) => {
                        if(doc.data().email !== user.email) {
                            arr.push({
                                id: doc.id,
                                name: doc.data().name,
                                email: doc.data().email,
                                photo: doc.data().photoURL
                            })
                        }
                    });
                    setPeopleList([...peopleList, ...arr]);
                })();
            }
          });
    }, [auth]);

    useEffect(async function() {
        if(!auth) {
            const response = await axios.get("https://api.tvmaze.com/shows");
            setShows(response.data);
        } else {
            onAuthStateChanged(auth, (user) => {
                (async () => {
                    const querySnapshot = await getDocs(collection(db, "likedshows"));
                    let dataAarr = [];
                    let namesArr = [];
                    querySnapshot.forEach((doc) => {
                        dataAarr.push(doc.data());
                        if(doc.data().emails.includes(user.email)) {
                            namesArr.push(doc.id);
                        }
                    });
                    setShows([...dataAarr]);
                    setLikedShows([...namesArr]);
                })();
            });
        }
    }, [db, auth]);

    useEffect(() => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 200);
    }, [isLogin]);

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
                    setLikedShows={setLikedShows}
                    likedShows={likedShows}
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
