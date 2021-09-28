import React from "react";
import "./friends.css";
import { NavLink } from "react-router-dom";
import ModalPage from "../../modal/modalPage";
import { doc, getFirestore, getDocs, updateDoc, arrayRemove, collection } from "firebase/firestore";
import { useState, useEffect } from "react/cjs/react.development";
import { getAuth, onAuthStateChanged } from "@firebase/auth";

const Friends = (props) => {
    const [friendList, setFriendList] = useState([]);
    const [compareMail, setCompareMail] = useState('');
    const db = getFirestore();
    const auth = getAuth();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setCompareMail(user.email);
            (async () => {
                const querySnapshot = await getDocs(collection(db, "users"));
                querySnapshot.forEach((doc) => {
                    if(doc.id === user.email) {
                        let arr = [];
                        doc.data().friends.forEach(man => arr.push(man));
                        setFriendList([...arr]);
                    }
                });
            })();
          });
    }, [auth, db]);

    const removeFromFriends = (man) => {
        const user = doc(db, "users", compareMail);
        (async () => {
            await updateDoc(user, {
                friends: arrayRemove(man),
            });
        })();
        setFriendList(friendList.filter(el => el.name !== man.name));
    }

    
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
                            <NavLink to={`/friends/${man.id}`}>
                                <h4>Name: {man.name}</h4>
                                <img src={man.photo} />
                                <p>Email: {man.email}</p>
                            </NavLink>
                            <button
                                className="button"
                                onClick={() => removeFromFriends(man)}
                            >
                                Remove from friends
                            </button> 
                        </div>
                    );
                })}
            </div>
        );
    } else {
        return (
            <div className="friends">
                <h2>
                    No friend to show. Please visit the PEOPLE page to see
                    all shows:
                </h2>
                <NavLink to="/people">
                    <button className="button">PEOPLE</button>
                </NavLink>
            </div>
        );
    }
};

export default Friends;
