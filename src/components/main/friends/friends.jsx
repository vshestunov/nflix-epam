import React from "react";
import "./friends.css";
import { NavLink } from "react-router-dom";
import ModalPage from "../../modal/modalPage";

const Friends = (props) => {
    if (!props.isLogin) {
        return (
            <ModalPage
                visible={props.isModalVisible}
                setVisible={props.setModalVisible}
            ></ModalPage>
        );
    }

    const removeFriend = (man) => {
        props.removeFromFriends(man);
    };

    if (props.friendList.length) {
        return (
            <div className="friends">
                {props.friendList.map((man) => {
                    return (
                        <div className="friend" key={man.id}>
                            <NavLink to={`/friends/${man.id}`}>
                                <h4>Name: {man.name}</h4>
                                <img src={man.photo} />
                                <p>Email: {man.email}</p>
                            </NavLink>
                            <button
                                className="button"
                                onClick={() => removeFriend(man)}
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
