import React, { useState } from "react";
import "./login.css";
import Loader from "../../loader/loader";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
} from "firebase/auth";
import { useHistory } from "react-router";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const Login = (props) => {
    const [userName, setUsetName] = useState("");
    const [password, setPassword] = useState("");
    const [inputName, setInputName] = useState("");
    const history = useHistory();
    const [hasAccount, setHasAccount] = useState(true);
    const db = getFirestore();

    if (props.isLoading) {
        return <Loader />;
    }

    const auth = getAuth();
    const register = (auth, name, pass) => {
        if (!name.includes("@")) {
            alert("erro in name");
        } else if (pass.length < 8) {
            alert("error in pass");
        } else {
            createUserWithEmailAndPassword(auth, name, pass)
                .then((userCredential) => {
                    props.setIsLogin(true);
                    login(auth, userName, password);
                    updateProfile(userCredential.user, {
                        displayName: inputName,
                        photoURL:
                            "https://media.istockphoto.com/photos/businessman-silhouette-as-avatar-or-default-profile-picture-picture-id476085198?s=612x612",
                    })
                        .then(() => {
                            console.log(userCredential.user.inputName);
                        })
                        .catch((error) => {
                            console.log(error.code);
                        });
                    try {
                        (async () =>
                            await setDoc(doc(db, "users", name), {
                                name: inputName,
                                email: name,
                                id: new Date(),
                                favorites: [],
                                friends: [],
                                recs: [],
                                photoURL:
                                    "https://media.istockphoto.com/photos/businessman-silhouette-as-avatar-or-default-profile-picture-picture-id476085198?s=612x612",
                            }))();
                    } catch (e) {
                        console.error("Error adding document: ", e);
                    }
                })
                .catch((error) => {
                    switch (error.code) {
                        case "auth/invalid-email": {
                            alert("INVALID EMAIL");
                            break;
                        }
                        case "auth/email-already-in-use": {
                            alert("email-already-in-use");
                            break;
                        }
                    }
                    setPassword("");
                    setUsetName("");
                });
        }
    };

    const login = (auth, name, pass) => {
        signInWithEmailAndPassword(auth, name, pass)
            .then((userCredential) => {
                props.setIsLogin(true);
                history.push("/profile");
            })
            .catch((error) => {
                switch (error.code) {
                    case "auth/invalid-email": {
                        alert("INVALID EMAIL");
                        break;
                    }
                    case "auth/wrong-password": {
                        alert("wrong-password");
                        break;
                    }
                    case "auth/user-not-found": {
                        alert("user-not-found");
                        break;
                    }
                }
                setPassword("");
                setUsetName("");
                console.log(`Code: ${error.code}, Message: ${error.Message}`);
            });
    };

    return (
        <div className="login">
            {hasAccount ? (
                <div>
                    <form className="login-form">
                        <h2>Please type in your credentials to Log In</h2>
                        <span>E-mail</span>
                        <input
                            type="text"
                            value={userName}
                            placeholder="Your username"
                            onChange={(e) => setUsetName(e.target.value)}
                            required={true}
                        />
                        <span>Password</span>
                        <input
                            type="password"
                            value={password}
                            placeholder="Your password"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button
                            type="submit"
                            className="button"
                            onClick={(e) => {e.preventDefault(); login(auth, userName, password)}}
                        >
                            LOG IN
                        </button>
                    </form>
                    <div>
                        Do not have an account yet? Please click{" "}
                        <span
                            className="span-link"
                            onClick={() => setHasAccount(false)}
                        >
                            here
                        </span>{" "}
                        to Sign Up!
                    </div>
                </div>
            ) : (
                <div>
                    <form className="login-form">
                        <h2>
                            Please provide your credentials to register an
                            account
                        </h2>
                        <span>E-mail</span>
                        <input
                            type="text"
                            value={userName}
                            placeholder="Username"
                            onChange={(e) => setUsetName(e.target.value)}
                            required
                        />
                        <span>Password (not less then 8 characters)</span>
                        <input
                            type="password"
                            value={password}
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <span>Full Name</span>
                        <input
                            type="text"
                            value={inputName}
                            placeholder="Full Name"
                            onChange={(e) => setInputName(e.target.value)}
                            required
                        />
                        <button
                            type="submit"
                            className="button"
                            onClick={(e) => {e.preventDefault(); register(auth, userName, password)}}
                        >
                            Sign Up
                        </button>
                    </form>
                    <div>
                        Already have an account? Please click{" "}
                        <span
                            className="span-link"
                            onClick={() => setHasAccount(true)}
                        >
                            here
                        </span>{" "}
                        to Log in!
                    </div>
                </div>
            )}
        </div>
    );
};

export default Login;
