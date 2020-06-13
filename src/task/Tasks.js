import React, {useEffect, useState} from "react";
import NumberButtons from "../ui/NumberButtons";
import * as process from '../process.js';

export function StartMakingLoopsTask({doTask}) {
    return <button onClick={doTask.bind(this, null)}>Start making loops</button>
}

export function ChooseBestTask({doTask}) {
    return <button onClick={doTask.bind(this, null)}>Choose best loop</button>
}

export function AddMoreInstruments({doTask, song}) {
    const yesHandler = () => {
        doTask({
            moreInstruments: true
        })
    }

    const noHandler = () => {
        doTask({
            moreInstruments: false
        })
    }

    return <div>
        Current instruments:
        <ul>
            {song.instruments.map(instrument => <li key={instrument.type}>{instrument.type}</li>)}
        </ul>
        Add more instruments?
        <button onClick={yesHandler}>Yes</button>
        <button onClick={noHandler}>No</button>
    </div>
}

export function MakeMoreScenes({doTask}) {
    const yesHandler = () => {
        doTask({
            moreScenes: true
        })
    }

    const noHandler = () => {
        doTask({
            moreScenes: false
        })
    }

    return <div>
        Make more scenes?
        <button onClick={yesHandler}>Yes</button>
        <button onClick={noHandler}>No</button>
    </div>
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

export function ChooseInstrument({doTask, song}) {
    const [instruments, setInstruments] = useState([]);

    const choose = instrument => {
        doTask({
            selectedInstrument: instrument
        })
    }

    useEffect(() =>{
        process.getInstruments()
            .then(instruments => {
                instruments = instruments.filter(instrument => {
                    return song.instruments.find(
                        songInstrument => {return songInstrument.type === instrument.type}) == null;
                });
                setInstruments(instruments);
            })
    }, [song]);


    return <div>
        Choose instrument
    <ul>
        {instruments.map(instrument => <li key={instrument.type} onClick={choose.bind(this, instrument.type)}>{instrument.type}</li>)}
    </ul>
    </div>
}