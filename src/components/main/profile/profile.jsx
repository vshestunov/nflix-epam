import React from "react";
import "./profile.css";
import photo from "../../../images/myphoto.jpg";
import { NavLink } from "react-router-dom";
import Loader from "../../loader/loader";

const Profile = (props) => {

    if(props.isLoading) {
        return <Loader />
    }

    return (
        <div className="profile">
            <div className="photo-cont">
                <img src={photo} alt="photo" />
            </div>
            <div className="info-cont">
                <h2>VIACHESLAV SHESTUNOV</h2>
                <p>e-mail: viacheslav_shestunov@epam.com</p>
                <p>Phone: +380 050 806 69 72</p>
                <NavLink to="/login">
                    <button className="button" onClick={() => props.setIsLogin(false)}>
                        LOGOUT
                    </button>
                </NavLink>
            </div>
        </div>
    );
};

export default Profile;
