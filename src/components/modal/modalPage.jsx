import React from "react";
import MyModal from "./modal";
import { NavLink } from "react-router-dom";

const ModalPage = (props) => {
    return (
        <div className="modal-cont">
            <MyModal
                visible={props.visible}
                setVisible={props.setVisible}
            >
                <h3>
                    You are not logged in. Please get to login page to get all
                    App functions.
                </h3>

                <NavLink to="/login">
                    <button className="button modal-button"> LOGIN </button>
                </NavLink>
            </MyModal>
            <h3>
                You are not logged in. Please get to login page to get all App
                functions.
            </h3>
            <NavLink to="/login">
                <button className="button modal-button"> LOGIN </button>
            </NavLink>
        </div>
    );
};

export default ModalPage;
