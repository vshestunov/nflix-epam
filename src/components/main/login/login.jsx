import React, { useState } from "react";
import "./login.css";
import Loader from "../../loader/loader";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile
} from "firebase/auth";
import { useHistory } from "react-router";
import { collection, addDoc, getFirestore, doc, setDoc } from "firebase/firestore";

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
                    console.log(userCredential.user);
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
                        (async () => await setDoc(doc(db, "users", name), {
                            name: inputName,
                            email: name,
                            id: new Date(),
                            favorites: [],
                            friends: [],
                            photoURL: 'https://media.istockphoto.com/photos/businessman-silhouette-as-avatar-or-default-profile-picture-picture-id476085198?s=612x612',
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
                    console.log(
                        `Code: ${error.code}, Message: ${error.Message}`
                    );
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
                <form className="login-form">
                    <h2>Please type in your credentials to Log In</h2>
                    <span>Username</span>
                    <input
                        type="text"
                        value={userName}
                        onChange={(e) => setUsetName(e.target.value)}
                        required={true}
                    />
                    <span>Password</span>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button
                        type="button"
                        className="button"
                        onClick={() => login(auth, userName, password)}
                    >
                        LOG IN
                    </button>
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
                </form>
            ) : (
                <form className="login-form">
                    <h2>
                        Please provide your credentials to register an account
                    </h2>
                    <span>Username</span>
                    <input
                        type="text"
                        value={userName}
                        onChange={(e) => setUsetName(e.target.value)}
                        required
                    />
                    <span>Password</span>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <span>Full Name</span>
                    <input
                        type="text"
                        value={inputName}
                        onChange={(e) => setInputName(e.target.value)}
                        required
                    />
                    <button
                        type="button"
                        className="button"
                        onClick={() => register(auth, userName, password)}
                    >
                        Sign Up
                    </button>
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
                </form>
            )}
        </div>
    );
};

export default Login;
