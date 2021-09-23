import React from "react";
import "./favorites.css";
import { NavLink } from "react-router-dom";
import ModalPage from "../../modal/modalPage";

const Favorites = (props) => {
    if (!props.isLogin) {
        return (
            <ModalPage
                visible={props.isModalVisible}
                setVisible={props.setModalVisible}
            ></ModalPage>
        );
    }

    const removeFromFavs = (show) => {
        props.removeFromFavorites(show);
    };

    if (props.favorites.length) {
        return (
            <div className="favorites">
                {props.favorites.map((show) => {
                    return (
                        <div className="favShow" key={show.id}>
                            <NavLink to={`shows/${show.id}`}>
                                <h4>{show.name}</h4>
                                <img src={show.image.medium} />
                            </NavLink>
                            <button
                                className="button"
                                onClick={() => removeFromFavs(show)}
                            >
                                Remove from favorites
                            </button>
                        </div>
                    );
                })}
            </div>
        );
    } else {
        return (
            <div className="favorites">
                <h2>
                    No favorite shows yet. Please visit the SHOWS page to see
                    all shows:
                </h2>
                <NavLink to="/shows">
                    <button className="button" onClick={props.setModalVisible(false)}>SHOWS</button>
                </NavLink>
            </div>
        );
    }
};

export default Favorites;
