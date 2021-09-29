import React, { useState, useEffect } from "react";
import "./recomendations.css";
import { NavLink } from "react-router-dom";
import ModalPage from "../../modal/modalPage";
import {
    getFirestore,
    getDocs,
    collection,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "@firebase/auth";

const Recommendations = (props) => {
    const [recsArr, setRecsArr] = useState([]);
    const db = getFirestore();
    const auth = getAuth();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            try {
                (async () => {
                    const querySnapshot = await getDocs(
                        collection(db, "users")
                    );
                    querySnapshot.forEach((doc) => {
                        if (doc.id === user.email) {
                            let arr = [];
                            doc.data().recs.forEach((rec) => arr.push(rec));
                            setRecsArr([...arr]);
                        }
                    });
                })();
            } catch (e) {
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

    if (recsArr.length) {
        return (
            <div className="recs">
                {recsArr.map((show) => {
                    return (
                        <div className="recShow" key={show.id}>
                            <NavLink to={`shows/${show.id}`}>
                                <h4>{show.name}</h4>
                                <img src={show.image.medium} />
                                <div className="rec-show-description-cont">
                                    <p>Time: {show.averageRuntime}</p>
                                    <p>Rating: {show.rating.average}</p>
                                    <p>Recommended by: {show.email}</p>
                                </div>
                            </NavLink>
                        </div>
                    );
                })}
            </div>
        );
    } else {
        return (
            <div className="recs-empty">
                <h2>
                    No favorite shows yet. Please visit the SHOWS page to see
                    all shows:
                </h2>
                <NavLink to="/shows">
                    <button
                        className="button"
                        onClick={props.setModalVisible(false)}
                    >
                        SHOWS
                    </button>
                </NavLink>
            </div>
        );
    }
};

export default Recommendations;
