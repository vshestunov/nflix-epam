import React from "react";
import { NavLink } from "react-router-dom";
import ModalPage from "../../modal/modalPage";
import "./people.css";

const People = (props) => {
    if (!props.isLogin) {
        return (
            <ModalPage  
            visible={props.isModalVisible}
            setVisible={props.setModalVisible}
            ></ModalPage>
        );
    }

    const addFriend = (man) => {
        props.addToFriends(man);
    };

    const removeFriend = (man) => {
        props.removeFromFriends(man);
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
                        {props.friendList.includes(man) ? (
                            <button
                                className="button"
                                onClick={() => removeFriend(man)}
                            >
                                Remove from friends
                            </button>
                        ) : (
                            <button
                                className="button"
                                onClick={() => addFriend(man)}
                            >
                                Add to friends
                            </button>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default People;
