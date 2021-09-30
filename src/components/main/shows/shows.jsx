import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./shows.css";
import MyModal from "../../modal/modal";
import Loader from "../../loader/loader";
import MySelect from "../../filters/MySelect";
import {
    doc,
    getFirestore,
    updateDoc,
    arrayUnion,
    arrayRemove,
    getDocs,
    collection,
    setDoc,
    increment,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import RecModalPage from "./recommendModal/recmodalPage";

const Shows = (props) => {
    const [compareMail, setCompareMail] = useState("");
    const [friendList, setFriendList] = useState([]);
    const db = getFirestore();
    const auth = getAuth();
    const [favArr, setFavArr] = useState([]);
    const [isRecModalVisible, setRecModalVisible] = useState(false);
    let [showForReccomend, setShowForReccomend] = useState("");
    const [likedShowsIDs, setLikedShowsIDs] = useState([]);
    const [allLikedShowsIDs, setAllLikedShowsIDs] = useState([]);
    const [likedShows, setLikedShows] = useState([]);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setCompareMail(user.email);
            }
            try {
                (async () => {
                    const querySnapshot = await getDocs(
                        collection(db, "users")
                    );
                    querySnapshot.forEach((doc) => {
                        if (user) {
                            if (doc.id === user.email) {
                                let arr = [];
                                let friendsArr = [];
                                doc.data().favorites.forEach((fav) =>
                                    arr.push(fav.name)
                                );
                                doc.data().friends.forEach((man) =>
                                    friendsArr.push(man)
                                );
                                setFavArr([...arr]);
                                setFriendList([...friendsArr]);
                            }
                        }
                    });
                })();

                (async () => {
                    const querySnapshot = await getDocs(
                        collection(db, "likes")
                    );
                    let dataAarr = [];
                    let idArr = [];
                    let allIDsArr = [];
                    querySnapshot.forEach((doc) => {
                        dataAarr.push(doc.data());
                        allIDsArr.push(doc.data().id);
                        if (user) {
                            if (doc.data().emails.includes(user.email)) {
                                idArr.push(doc.data().id);
                            }
                        }
                    });
                    setLikedShows([...dataAarr]);
                    setLikedShowsIDs([...idArr]);
                    setAllLikedShowsIDs([...allIDsArr]);
                })();
            } catch (e) {
                console.log(e);
            }
        });
    }, [auth]);

    useEffect(() => {
        try {
            (async () => {
                const querySnapshot = await getDocs(collection(db, "likes"));
                let dataAarr = [];
                let allIDsArr = [];
                querySnapshot.forEach((doc) => {
                    dataAarr.push(doc.data());
                    allIDsArr.push(doc.data().id);
                });
                console.log("render");
                setLikedShows([...dataAarr]);
                setAllLikedShowsIDs([...allIDsArr]);
            })();
        } catch (e) {
            console.log(e);
        }
    }, [likedShowsIDs]);

    let genresArr = [];
    props.shows.map((show) => {
        show.genres.map((genre) => {
            genresArr.push(genre);
        });
    });

    let genresrSet = [...new Set(genresArr)];

    let genresOptions = [];

    genresrSet.map((genre) => {
        genresOptions.push({ value: genre, name: genre });
    });

    const addToFavs = (show) => {
        if (!props.isLogin) {
            props.setModalVisible(true);
            return null;
        }
        const user = doc(db, "users", compareMail);
        try {
            (async () => {
                await updateDoc(user, {
                    favorites: arrayUnion(show),
                });
            })();
            setFavArr([...favArr, show.name]);
        } catch (e) {
            console.log(e);
        }
    };

    const removeFromFavorites = (show) => {
        const user = doc(db, "users", compareMail);
        try {
            (async () => {
                await updateDoc(user, {
                    favorites: arrayRemove(show),
                });
            })();
            setFavArr(favArr.filter((el) => el !== show.name));
        } catch (e) {
            console.log(e);
        }
    };

    const like = (show) => {
        if (!props.isLogin) {
            props.setModalVisible(true);
            return null;
        }
        for (let i = 0; i < likedShows.length; i++) {
            if (likedShows[i].id === show.id) {
                const likedShow = doc(db, "likes", show.name);
                try {
                    (async () => {
                        await updateDoc(likedShow, {
                            emails: arrayUnion(compareMail),
                            likes: increment(1),
                        });
                        setLikedShowsIDs([...likedShowsIDs, show.id]);
                    })();

                    return;
                } catch (e) {
                    console.log(e);
                }
            }
        }
        try {
            (async () => {
                await setDoc(doc(db, "likes", show.name), {
                    name: show.name,
                    emails: [compareMail],
                    id: show.id,
                    likes: 1,
                });
                setLikedShowsIDs([...likedShowsIDs, show.id]);
            })();
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };

    const dislike = (show) => {
        const likedShow = doc(db, "likes", show.name);
        try {
            (async () => {
                await updateDoc(likedShow, {
                    emails: arrayRemove(compareMail),
                    likes: increment(-1),
                });
                setLikedShowsIDs(likedShowsIDs.filter((el) => el !== show.id));
            })();
        } catch (e) {
            console.log(e);
        }
    };

    const getLikes = (show) => {
        for (let i = 0; i < likedShows.length; i++) {
            if (likedShows[i].id === show.id) {
                return likedShows[i].likes;
            }
        }
    };

    const reccomend = (show) => {
        setShowForReccomend({
            name: show.name,
            averageRuntime: show.averageRuntime,
            image: show.image,
            email: compareMail,
            rating: show.rating,
            genres: show.genres,
            id: show.id,
        });
        setRecModalVisible(true);
    };

    const sendRecommend = (friend) => {
        const user = doc(db, "users", friend.email);
        try {
            (async () => {
                console.log(showForReccomend);
                await updateDoc(user, {
                    recs: arrayUnion(showForReccomend),
                });
            })();
            setRecModalVisible(false);
        } catch (e) {
            console.log(e);
        }
    };

    if (props.isLoading) {
        return <Loader />;
    }

    return (
        <div className="shows">
            <MyModal
                visible={props.isModalVisible}
                setVisible={props.setModalVisible}
            >
                <h3>
                    You are not logged in. Please get to login page to get all
                    App functions.
                </h3>

                <NavLink to="/login">
                    <button className="button modal-button"> LOGIN </button>
                </NavLink>
            </MyModal>
            <RecModalPage
                visible={isRecModalVisible}
                setVisible={setRecModalVisible}
                friends={friendList}
                sendRecommend={sendRecommend}
            />

            <div className="shows-cont">
                {props.shows.map((show) => {
                    let currentLikes = 0;
                    if (allLikedShowsIDs.includes(show.id)) {
                        currentLikes = getLikes(show);
                    }
                    return (
                        <div key={show.id} className="show">
                            <NavLink to={`shows/${show.id}`}>
                                <h4>{show.name}</h4>
                                {show.image ? (
                                    <img src={show.image.medium} />
                                ) : (
                                    <img alt={"no image"} />
                                )}
                                <div className="show-description-cont">
                                    <p className='likes-and-rat'> <span>&#9733;: {show.rating.average}</span><span>&#8987;: {show.averageRuntime}</span><span>&#9829;: {currentLikes}</span></p>
                                </div>
                            </NavLink>
                            <div className="shows-buttons">
                                {likedShowsIDs.includes(show.id) ? (
                                    <button
                                        className="button shows-button"
                                        onClick={() => {
                                            dislike(show);
                                            currentLikes++;
                                        }}
                                    >
                                        Disike &#9829;
                                    </button>
                                ) : (
                                    <button
                                        className="button shows-button"
                                        onClick={() => {
                                            like(show);
                                        }}
                                    >
                                        Like &#9825;
                                    </button>
                                )}
                                {favArr.includes(show.name) ? (
                                    <button
                                        className="button shows-button"
                                        onClick={() =>
                                            removeFromFavorites(show)
                                        }
                                    >
                                        Remove from favorites
                                    </button>
                                ) : (
                                    <button
                                        className="button shows-button"
                                        onClick={() => addToFavs(show)}
                                    >
                                        Add to favorites
                                    </button>
                                )}
                                <button
                                    className="button shows-button"
                                    onClick={() => reccomend(show)}
                                >
                                    Reccomend to friend
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="filters-cont">
                <div className="filters-fixed-cont">
                    <h5>Searh by name</h5>
                    <input
                        type="text"
                        placeholder="name"
                        value={props.searchQuery}
                        onChange={(event) =>
                            props.setSearchQuery(event.target.value)
                        }
                    />
                    <h5>Filter by genres:</h5>
                    <MySelect
                        options={genresOptions}
                        default="All genres"
                        action={props.setSelectedFilter}
                        method={props.selectedFilter}
                    />
                    <h5>Sort shows:</h5>
                    <MySelect
                        options={[
                            {
                                value: "time, from-top",
                                name: "By time from top",
                            },
                            {
                                value: "time, from-down",
                                name: "By time from down",
                            },
                            {
                                value: "rating, from-top",
                                name: "By rating from top",
                            },
                            {
                                value: "rating, from-down",
                                name: "By rating from down",
                            },
                        ]}
                        default="Sort by time or rating"
                        action={props.setSortMethod}
                        method={props.sortMethod}
                    />
                    <button
                        className="button get-shows-button"
                        onClick={props.getMoreShows}
                    >
                        Get More Shows
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Shows;
