import React, { useState } from "react";
import { useParams } from "react-router";
import "./shows.css";
import axios from "axios";

const Show = (props) => {
    const params = useParams();

    const [show, setShow] = useState({});

    async function getShow(show) {
        if (show.id) {
            return show;
        } else {
            console.log(show.id);
            const response = await axios.get(
                `https://api.tvmaze.com/shows/${params.id}`
            );
            setShow(response.data);
        }
    }

    getShow(show);

    if (show.id) {
        return (
            <div className="show-page">
                <h3>{show.name}</h3>
                <img src={show.image.original} />
                <div className='show-description-cont'>
                    <p>Language: {show.language}</p>
                    <p>Rating: {show.rating.average}</p>
                    <p>Genres: {show.genres.join(", ")}</p>
                </div>
            </div>
        );
    } else {
        return <div className="show-page"></div>;
    }
};

export default Show;
