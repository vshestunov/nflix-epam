import React from "react";
import { NavLink } from "react-router-dom";
import "./login.css";
import Loader from "../../loader/loader";

const Login = (props) => {

    if(props.isLoading) {
        return <Loader />
    }

    return (
        <div className="login">
            <form className="login-form">
                <h2>Please feel free to press login button!</h2>
                <input type="text" value="Viacheslav Shestunov" />
                <input type="password" value="aaaaaaaaaaa" />
                <NavLink to="/profile">
                    <button
                        type="button"
                        className="button"
                        onClick={() => props.setIsLogin(true)}
                    >
                        LOGIN
                    </button>
                </NavLink>
            </form>
        </div>
    );
};

export default Login;
