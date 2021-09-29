import React, {useState} from "react";
import "./profile.css";
import { NavLink } from "react-router-dom";
import Loader from "../../loader/loader";
import { useHistory } from "react-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Profile = (props) => {
    const auth = getAuth();
    const history = useHistory();
    const [name, setName] = useState('');
    const [mail, setMail] = useState('');
    const [photo, setPhoto] = useState('');

    onAuthStateChanged(auth, (user) => {
        if (user) {
            setName(user.displayName);
            setMail(user.email);
            setPhoto(user.photoURL);
        }
      });

    if(props.isLoading) {
        return <Loader />
    }

    if(!props.isLogin) {
        history.push('/login')
    }

    return (
        <div className="profile">
            <div className="photo-cont">
                <img src={photo} alt="photo" />
            </div>
            <div className="info-cont">
                <h2>User Name: {name}</h2>
                <p>e-mail: {mail}</p>
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
