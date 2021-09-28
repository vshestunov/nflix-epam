import React from "react";
import "./favorites.css";
import { NavLink } from "react-router-dom";
import ModalPage from "../../modal/modalPage";
import { doc, getFirestore, getDocs, updateDoc, arrayRemove, collection } from "firebase/firestore";
import { useState, useEffect } from "react/cjs/react.development";
import { getAuth, onAuthStateChanged } from "@firebase/auth";

const Favorites = (props) => {
    const [favArr, setFavArr] = useState([]);
    
    const db = getFirestore();

    const auth = getAuth();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if(user) {
                (async () => {
                    const querySnapshot = await getDocs(collection(db, "users"));
                    querySnapshot.forEach((doc) => {
                        if(doc.id === user.email) {
                            let arr = [];
                            doc.data().favorites.forEach(fav => arr.push(fav));
                            setFavArr([...favArr, ...arr]);
                        }
                    });
                })();
            }
          });
    }, [auth]);

    if (!props.isLogin) {
        return (
            <ModalPage
                visible={props.isModalVisible}
                setVisible={props.setModalVisible}
            ></ModalPage>
        );
    }


    // const removeFromFavs = (show) => {
    //     const user = doc(db, "users", compareMail);
    //     const user = doc(collection('users').document(compareMail));
    //     (async() => {
    //         await updateDoc(user, {
    //             favorites: arrayRemove(show)
    //         });
    //     })();
    // };

    if (favArr.length) {
        return (
            <div className="favorites">
                {favArr.map((show) => {
                    return (
                        <div className="favShow" key={show.id}>
                            <NavLink to={`shows/${show.id}`}>
                                <h4>{show.name}</h4>
                                <img src={show.image.medium} />
                            </NavLink>
                            {/* <button
                                className="button"
                                onClick={() => removeFromFavs(show)}
                            >
                                Remove from favorites
                            </button> */}
                        </div>
                    );
                })}
            </div>
        );
    } else {
        return (
            <div className="favorites">
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
