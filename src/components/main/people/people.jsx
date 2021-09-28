import React, {useEffect} from "react";
import { NavLink } from "react-router-dom";
import ModalPage from "../../modal/modalPage";
import "./people.css";
import {
    doc,
    getFirestore,
    updateDoc,
    arrayUnion
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const People = (props) => {
    let compareMail = "";
    const db = getFirestore();
    const auth = getAuth();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            compareMail = user.email;
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

    const addFriend = (man) => {
        const user = doc(db, "users", compareMail);
        (async () => {
            await updateDoc(user, {
                friends: arrayUnion(man),
            });
        })();
    };

    return (
        <div className="people">
            {props.peopleList.map((man) => {
                return (
                    <div className="man" key={man.id}>
                        <NavLink to={`/people/${man.id}`}>
                            <h4>Name: {man.name}</h4>
                            <img src={man.photo} />
                            <p>Email: {man.email}</p>
                        </NavLink>
                            <button
                                className="button"
                                onClick={() => addFriend(man)}
                            >
                                Add to friends
                            </button>
                    </div>
                );
            })}
        </div>
    );
};

export default People;
