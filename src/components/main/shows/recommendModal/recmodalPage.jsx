import React from "react";
import RecModal from "./recmodal";
import "./recmodalpage.css";

const RecModalPage = (props) => {
    return (
        <div className="modal-cont">
            <RecModal visible={props.visible} setVisible={props.setVisible}>
                {props.friends.length ? (
                    <div>
                        <h2>
                            Please choose a friend to send your recommendation:
                        </h2>
                        <div className="modal-friends">
                            {props.friends.map((friend) => {
                                return (
                                    <div className="modal-friend" key={friend.name}>
                                        <img
                                            className="rec-modal-photo"
                                            src={friend.photo}
                                            alt="photo"
                                        />
                                        <p>{friend.name}</p>
                                        <button
                                            className="button rec-modal-button"
                                            onClick={() =>
                                                props.sendRecommend(friend)
                                            }
                                        >
                                            Send Reccomend
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ) : (
                    <h2>You don't have friends yet :( </h2>
                )}
            </RecModal>
        </div>
    );
};

export default RecModalPage;
