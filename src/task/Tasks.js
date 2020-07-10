import React, {useEffect, useState} from "react";
import * as process from '../process.js';

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
                    const done = !!song.instruments.find(songInstrument => {
                        return songInstrument === instrument
                    });
                    return {type: instrument, done: done};
                });
                if(song.instruments.length > 0) {
                    instruments.push({type:'NONE'});
                }
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