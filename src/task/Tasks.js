import React, {useEffect, useState} from "react";
import NumberButtons from "../ui/NumberButtons";
import * as process from '../process.js';

export function StartMakingLoopsTask({doTask}) {
    return <button onClick={doTask.bind(this, null)}>Start making loops</button>
}

export function ChooseBestTask({doTask}) {
    return <button onClick={doTask.bind(this, null)}>Choose best loop</button>
}

export function HowManyLoopsTask({doTask}) {
    const numberHandler = number => {
        doTask({
            loops: number
        });
    };

    return <div>How many loops did you make? <NumberButtons handler={numberHandler} amount="10"/></div>
}

export function DeleteLoopsTask({doTask}) {
    const numberHandler = number => {
        doTask({
            deleted: number
        });
    };

    return <div>How many loops did you delete? <NumberButtons handler={numberHandler} amount="10"/></div>
}

export function ChooseInstrument({doTask}) {
    const [instruments, setInstruments] = useState([]);

    const choose = instrument => {
        doTask({
            selected_instrument: instrument
        })
    }

    useEffect(() =>{
        process.getInstruments()
            .then(instruments =>{
                setInstruments(instruments)
            })
    }, []);


    return <div>
        Choose instrument
    <ul>
        {instruments.map(instrument => <li onClick={choose.bind(this, instrument.type)}>{instrument.type}</li>)}
    </ul>
    </div>
}