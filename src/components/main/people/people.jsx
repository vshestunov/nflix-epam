import React, {useEffect, useState} from "react";
import ModalPage from "../../modal/modalPage";
import "./people.css";
import { doc, getFirestore, getDocs, updateDoc, arrayUnion, arrayRemove, collection } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const People = (props) => {
    const [compareMail, setCompareMail] = useState('');
    const db = getFirestore();
    const auth = getAuth();
    const [friendList, setFriendList] = useState([]);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            try {
                setCompareMail(user.email);
                (async () => {
                    const querySnapshot = await getDocs(collection(db, "users"));
                    querySnapshot.forEach((doc) => {
                        if(doc.id === user.email) {
                            let arr = [];
                            doc.data().friends.forEach(man => arr.push(man.name));
                            setFriendList([...arr]);
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

    const addFriend = (man) => {
        const user = doc(db, "users", compareMail);
        try {
            (async () => {
                await updateDoc(user, {
                    friends: arrayUnion(man),
                });
            })();
            setFriendList([...friendList, man.name]);
        } catch(e) {
            console.log(e);
        }
    };

    const removeFromFriends = (man) => {
        const user = doc(db, "users", compareMail);
        try {
            (async () => {
                await updateDoc(user, {
                    friends: arrayRemove(man),
                });
            })();
            setFriendList(friendList.filter(el => el !== man.name));
        } catch(e) {
            console.log(e);
        }
    }

    return (
        <div className="people">
            {props.peopleList.map((man) => {
                return (
                    <div className="man" key={man.id}>
                            <h4>Name: {man.name}</h4>
                            <img src={man.photo} />
                            <p>Email: {man.email}</p>
                        <div className="people-button-cont">
                        {friendList.includes(man.name) ? (
                                    <button
                                    className="button"
                                    onClick={() => removeFromFriends(man)}
                                >
                                    Remove from friends
                                </button>
                                ) : (
                                    <button
                                    className="button"
                                    onClick={() => addFriend(man)}
                                >
                                    Add to Friends
                                </button>
                                )

                                }
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default People;
