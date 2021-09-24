import React from "react";
import { NavLink } from "react-router-dom";
import "./shows.css";
import MyModal from "../../modal/modal";
import Loader from "../../loader/loader";
import MySelect from "../../filters/MySelect";

const Shows = (props) => {

    const addToFavs = (show) => {
        if (!props.isLogin) {
            props.setModalVisible(true);
            return null;
        }
        props.addToFavorites(show);
    };

    const removeFromFavs = (show) => {
        props.removeFromFavorites(show);
    };

    const like = (show) => {
        if (!props.isLogin) {
            props.setModalVisible(true);
            return null;
        }
        props.likeShow(show);
    };

    const dislike = (show) => {
        props.dislikeShow(show);
    };

    if (props.isLoading) {
        return <Loader />;
    }

    return (
        <div className="shows">
            <MyModal
                visible={props.isModalVisible}
                setVisible={props.setModalVisible}
            >
                <h3>
                    You are not logged in. Please get to login page to get all
                    App functions.
                </h3>

                <NavLink to="/login">
                    <button className="button modal-button"> LOGIN </button>
                </NavLink>
            </MyModal>
            <div className="shows-cont">
                {props.shows.map((show) => {
                    return (
                        <div key={show.id} className="show">
                            <NavLink to={`shows/${show.id}`}>
                                <h4>{show.name}</h4>
                                <img src={show.image.medium} />
                                <p>Time: {show.averageRuntime}</p>
                                <p>Genres: {show.genres.join(', ')}</p>
                                <p>Rating: {show.rating.average}</p>
                            </NavLink>
                            <div className="buttons">
                                {props.likedShows.includes(show) ? (
                                    <button
                                        className="button"
                                        onClick={() => dislike(show)}
                                    >
                                        Disike &#9829;
                                    </button>
                                ) : (
                                    <button
                                        className="button"
                                        onClick={() => like(show)}
                                    >
                                        Like &#9825;
                                    </button>
                                )}

                                {props.favorites.includes(show) ? (
                                    <button
                                        className="button"
                                        onClick={() => removeFromFavs(show)}
                                    >
                                        Remove from favorites
                                    </button>
                                ) : (
                                    <button
                                        className="button"
                                        onClick={() => addToFavs(show)}
                                    >
                                        Add to favorites
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className='filters-cont'>
                <h5>Searh by name</h5>
                <input type='text' placeholder='name' value={props.searchQuery} onChange={(event) => props.setSearchQuery(event.target.value)} />
                <h5>Filter by genres:</h5>
                <MySelect 
                    options={props.genres}
                    default='Filter by genres'
                    action={props.setSelectedFilter}
                    method={props.selectedFilter}
                />
                <h5>Sort shows:</h5>    
                <MySelect 
                    options={[
                        {value: 'time, from-top', name: 'By time from top'},
                        {value: 'time, from-down', name: 'By time from down'},
                        {value: 'rating, from-top', name: 'By rating from top'},
                        {value: 'rating, from-down', name: 'By rating from down'}
                    ]}
                    default='Sort by time or rating'
                    action={props.sortShows}
                    method={props.sortMethod}
                />
            </div>
        </div>
    );
};

export default Shows;
