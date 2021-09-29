import React, { useState, useEffect } from "react";
import "./favorites.css";
import { NavLink } from "react-router-dom";
import ModalPage from "../../modal/modalPage";
import { doc, getFirestore, getDocs, updateDoc, arrayRemove, collection } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "@firebase/auth";

const Favorites = (props) => {
    const [favArr, setFavArr] = useState([]);
    const [compareMail, setCompareMail] = useState('');
    const db = getFirestore();
    const auth = getAuth();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            try {
                setCompareMail(user.email);
                (async () => {
                    const querySnapshot = await getDocs(collection(db, "users"));
                    querySnapshot.forEach((doc) => {
                        if(doc.id === user.email) {
                            let arr = [];
                            doc.data().favorites.forEach(fav => arr.push(fav));
                            setFavArr([...arr]);
                        }
                    });
                })();
            } catch(e) {
                console.log(e);
            }
          });
    }, [auth, db]);

    if (!props.isLogin) {
        return (
            <ModalPage
                visible={props.isModalVisible}
                setVisible={props.setModalVisible}
            ></ModalPage>
        );
    }


    const removeFromFavorites = (show) => {
        const user = doc(db, "users", compareMail);
        try {
            (async () => {
                await updateDoc(user, {
                    favorites: arrayRemove(show),
                });
            })();
            setFavArr(favArr.filter(el => el.name !== show.name));
        } catch(e) {
            console.log(e);
        }
    }

    if (favArr.length) {
        return (
            <div className="favorites">
                {favArr.map((show) => {
                    return (
                        <div className="favShow" key={show.id}>
                            <NavLink to={`shows/${show.id}`}>
                                <h4>{show.name}</h4>
                                <img src={show.image.medium} />
                                <div className="fav-show-description-cont">
                                    <p>Time: {show.averageRuntime}</p>
                                    <p>Rating: {show.rating.average}</p>
                                    <p>Likes: {show.likes}</p>
                                </div>
                            </NavLink>
                            <div className="fav-button-cont">
                            <button
                                className="button"
                                onClick={() => removeFromFavorites(show)}
                            >
                                Remove from favorites
                            </button> 
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    } else {
        return (
            <div className="favorites-empty">
                <h2>
                    No favorite shows yet. Please visit the SHOWS page to see
                    all shows:
                </h2>
                <NavLink to="/shows">
                    <button className="button" onClick={props.setModalVisible(false)}>SHOWS</button>
                </NavLink>
            </div>
        );
    }
};

export default Favorites;
