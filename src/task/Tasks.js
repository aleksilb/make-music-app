import React, {useEffect, useState} from "react";
import * as process from '../process.js';

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

export function YesNoTask({doTask, task}) {
    const yesHandler = () => {
        doTask({
            choice: true
        })
    }

    const noHandler = () => {
        doTask({
            choice: false
        })
    }

    return <div>
        {task.variables.taskText.value}
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

export function ChooseInstrumentType({doTask, song}) {
    const [instruments, setInstruments] = useState([]);

    const choose = instrument => {
        doTask({
            selectedInstrument: instrument
        })
    }

    useEffect(() =>{
        process.getInstruments()
            .then(instruments => {
                instruments = instruments.map(instrument => {
                    instrument.done = !!song.instruments.find(songInstrument => {
                        return songInstrument.type === instrument.type
                    });
                    return instrument;
                });
                setInstruments(instruments);
            })
    }, [song]);


    return <div>
        Choose instrument
    <ul>
        {instruments.map(instrument => <li key={instrument.type} onClick={choose.bind(this, instrument.type)}>{instrument.type} {instrument.done ? '*' : ''}</li>)}
    </ul>
    </div>
}

export function SimpleTask({doTask, task}) {
    return <button onClick={doTask.bind(this, null)}>{task.variables.taskText.value}</button>
}