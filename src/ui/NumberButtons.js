import React from "react";

function NumberButtons(props) {
    let numbers = [];
    for (let i = 1; i < props.amount; i++) {
        numbers.push({'title': i, 'value': i});
    }

    const handleClick = value => {
        props.handler(value);
    };

    return numbers.map(amount => <button onClick={handleClick.bind(this, amount.value)}>{amount.title}</button>);
}

export default NumberButtons;