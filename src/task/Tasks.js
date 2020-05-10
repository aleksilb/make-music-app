import React from "react";
import NumberButtons from "../ui/NumberButtons";

export function StartMakingLoopsTask(props) {
    return <button onClick={props.doTask.bind(this, null)}>Start making loops</button>
}

export function ChooseBestTask(props) {
    return <button onClick={props.doTask.bind(this, null)}>Choose best loop</button>
}

export function HowManyLoopsTask(props) {
    const numberHandler = number => {
        props.doTask({
            "variables":
                {"loops": {"value": number}}
        });
    };

    return <div>How many loops did you make? <NumberButtons handler={numberHandler} amount="10"/></div>
}

export function DeleteLoopsTask(props) {
    const numberHandler = number => {
        props.doTask({
            "variables":
                {"deleted": {"value": number}}
        });
    };

    return <div>How many loops did you delete? <NumberButtons handler={numberHandler} amount="10"/></div>
}