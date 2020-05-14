import React from "react";

function NumberButtons({amount, handler}) {
    let numbers = [];
    for (let i = 1; i < amount; i++) {
        numbers.push({'title': i, 'value': i});
    }

    const handleClick = value => {
        handler(value);
    };

    return numbers.map(amount => <button onClick={handleClick.bind(this, amount.value)}>{amount.title}</button>);
}

export default NumberButtons;