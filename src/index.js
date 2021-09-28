import React, { createContext } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyDsIUJT5EzHnTeAMBYFq1961eKAmLzezSs",
    authDomain: "nflix-by-vs.firebaseapp.com",
    projectId: "nflix-by-vs",
    storageBucket: "nflix-by-vs.appspot.com",
    messagingSenderId: "553096384035",
    appId: "1:553096384035:web:f52dade42cbe450180ab96",
};

const app = initializeApp(firebaseConfig);

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("root")
);

reportWebVitals();
