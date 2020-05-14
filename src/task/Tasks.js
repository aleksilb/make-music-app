import React from "react";
import NumberButtons from "../ui/NumberButtons";

export function StartMakingLoopsTask({doTask}) {
    return <button onClick={doTask.bind(this, null)}>Start making loops</button>
}

export function ChooseBestTask({doTask}) {
    return <button onClick={doTask.bind(this, null)}>Choose best loop</button>
}

export function HowManyLoopsTask({doTask}) {
    const numberHandler = number => {
        doTask({
            "variables":
                {"loops": {"value": number}}
        });
    };

    return <div>How many loops did you make? <NumberButtons handler={numberHandler} amount="10"/></div>
}

export function DeleteLoopsTask({doTask}) {
    const numberHandler = number => {
        doTask({
            "variables":
                {"deleted": {"value": number}}
        });
    };

    return <div>How many loops did you delete? <NumberButtons handler={numberHandler} amount="10"/></div>
}