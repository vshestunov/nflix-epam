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
    setDoc
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Shows = (props) => {
    const [compareMail, setCompareMail] = useState('');
    const db = getFirestore();
    const auth = getAuth();
    const [favArr, setFavArr] = useState([]);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setCompareMail(user.email);
            (async () => {
                const querySnapshot = await getDocs(collection(db, "users"));
                querySnapshot.forEach((doc) => {
                    if(doc.id === user.email) {
                        let arr = [];
                        doc.data().favorites.forEach(fav => arr.push(fav.name));
                        setFavArr([...favArr, ...arr]);
                    }
                });
            })();
            console.log(favArr);
        });
    }, [auth,db]);

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
        (async () => {
            await updateDoc(user, {
                favorites: arrayUnion(show),
            });
        })();
    };

    const remove = (show) => {

    }

    const like = (show) => {
        if (!props.isLogin) {
            props.setModalVisible(true);
            return null;
        }
        (async () => await setDoc(doc(db, "likedshows", show.name), {
            name: show.name,
            usermail: compareMail,
            likes: 1
        }))();
    };

    const dislike = (show) => {
        props.dislikeShow(show);
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
            <div className="shows-cont">
                {props.shows.map((show) => {
                    return (
                        <div key={show.id} className="show">
                            <NavLink to={`shows/${show.id}`}>
                                <h4>{show.name}</h4>
                                <img src={show.image.medium} />
                                <p>Time: {show.averageRuntime}</p>
                                <p>Genres: {show.genres.join(", ")}</p>
                                <p>Rating: {show.rating.average}</p>
                            </NavLink>
                            <div className="buttons">
                                {props.likedShows.includes(show) ? (
                                    <button
                                        className="button"
                                        onClick={() => dislike(show)}
                                    >
                                        Disike &#9829;
                                    </button>
                                ) : (
                                    <button
                                        className="button"
                                        onClick={() => like(show)}
                                    >
                                        Like &#9825;
                                    </button>
                                )}
                                {favArr.includes(show.name) ? (
                                    <button
                                    className="button"
                                    onClick={() => addToFavs(show)}
                                >
                                    Remove from favorites
                                </button>
                                ) : (
                                    <button
                                    className="button"
                                    onClick={() => addToFavs(show)}
                                >
                                    Add to favorites
                                </button>
                                )

                                }

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
                </div>
            </div>
        </div>
    );
};

export default Shows;
