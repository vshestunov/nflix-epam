import React from "react";

const MySelect = (props) => {
    return (
        <select value={props.method} onChange={(event) => props.action(event.target.value)}>
            <option value=''>{props.default}</option>
            {props.options.map((option) => {
                return <option value={option.value} key={option.value}> {option.name} </option>;
            })}
        </select>
    );
};

export default MySelect;
