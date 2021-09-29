import React, { useState, useEffect } from "react";
import "./friends.css";
import { NavLink } from "react-router-dom";
import ModalPage from "../../modal/modalPage";
import {
    doc,
    getFirestore,
    getDocs,
    updateDoc,
    arrayRemove,
    collection,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "@firebase/auth";

const Friends = (props) => {
    const [friendList, setFriendList] = useState([]);
    const [compareMail, setCompareMail] = useState("");
    const db = getFirestore();
    const auth = getAuth();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            try {
                setCompareMail(user.email);
                (async () => {
                    const querySnapshot = await getDocs(
                        collection(db, "users")
                    );
                    querySnapshot.forEach((doc) => {
                        if (doc.id === user.email) {
                            let arr = [];
                            doc.data().friends.forEach((man) => arr.push(man));
                            setFriendList([...arr]);
                        }
                    });
                })();
            } catch (e) {
                console.log(e);
            }
        });
    }, [auth, db]);

    const removeFromFriends = (man) => {
        const user = doc(db, "users", compareMail);
        try {
            (async () => {
                await updateDoc(user, {
                    friends: arrayRemove(man),
                });
            })();
            setFriendList(friendList.filter((el) => el.name !== man.name));
        } catch (e) {
            console.log(e);
        }
    };

    if (!props.isLogin) {
        return (
            <ModalPage
                visible={props.isModalVisible}
                setVisible={props.setModalVisible}
            ></ModalPage>
        );
    }

    if (friendList.length) {
        return (
            <div className="friends">
                {friendList.map((man) => {
                    return (
                        <div className="friend" key={man.id}>
                            <h4>Name: {man.name}</h4>
                            <img src={man.photo} />
                            <p>Email: {man.email}</p>
                            <div className="friend-button-cont">
                                <button
                                    className="button"
                                    onClick={() => removeFromFriends(man)}
                                >
                                    Remove from friends
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    } else {
        return (
            <div className="friends-empty">
                <h2>
                    No friend to show. Please visit the PEOPLE page to see all
                    shows:
                </h2>
                <NavLink to="/people">
                    <button className="button">PEOPLE</button>
                </NavLink>
            </div>
        );
    }
};

export default Friends;
