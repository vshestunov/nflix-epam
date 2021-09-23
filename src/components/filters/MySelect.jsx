import React from "react";

const MySelect = (props) => {
    return (
        <select value={props.sortMethod} onChange={(event) => props.sortShows(event.target.value)}>
            <option disabled>{props.default}</option>
            {props.options.map((option) => {
                return <option value={option.value}> {option.name} </option>;
            })}
        </select>
    );
};

export default MySelect;
