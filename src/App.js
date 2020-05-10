import React, {useEffect, useState} from 'react';
import plingSound from './pling.wav';
import * as process from './process.js';

function App() {
    const [song, setSong] = useState(null);

    const songCreated = newSong => {
        startSong(newSong);
    };

    const startSong = song => {
        process.startSong(song.id, () => {setSong(song)});
    }

    return (
        <div className="App">
            {song != null ? <TaskHandler song={song}/> : <NewSong handleCreate={songCreated}/>}
        </div>
    );
}

function NewSong(props) {
    const [songName, setSongName] = useState('');

    const createSong = songName => {
        process.createSong(songName, song => {
            props.handleCreate(song);
        });
    };

    const handleNameChange = event => {
        setSongName(event.target.value);
    };

    const handleSubmit = event => {
        createSong(songName);
        event.preventDefault();
    };

    return <form onSubmit={handleSubmit}>
        <input type='text' value={songName} onChange={handleNameChange}/>
        <input type="submit" value="Start song" />
    </form>
}

function TaskHandler(props) {
    const [task, setTask] = useState(null);
    let song = props.song;

    const handleNewTask = newTask => {
        setTask(newTask);
        let audio = new Audio(plingSound);
        audio.play();
    };

    const waitForNext = () => {
        setTask(null);
        waitForTasks(song.id, response => {
            handleNewTask(response);
        });
    };

    useEffect(waitForNext,[]);

    const getComponent = task => {
        if(task == null) return null;

        switch (task.taskDefinitionKey) {
            case 'how-many-loops':
                return HowManyLoopsTask;
            case 'start-making-loops':
                return StartMakingLoopsTask;
            case 'choose-best':
                return ChooseBestTask;
            case 'delete-loops':
                return DeleteLoopsTask;
            default:
                return null;
        }
    };

    const doTask = variables => {
        process.doTask(task.id, variables, () => {waitForNext();});
    };

    const TaskComponent = getComponent(task);
    return <div>
        <div>Song: {song.name}</div>
        {TaskComponent != null ? <TaskComponent doTask={doTask}/> : "No tasks"}</div>
}

function StartMakingLoopsTask(props) {
    return <button onClick={props.doTask.bind(this, null)}>Start making loops</button>
}

function ChooseBestTask(props) {
    return <button onClick={props.doTask.bind(this, null)}>Choose best loop</button>
}

function HowManyLoopsTask(props) {
    const numberHandler = number => {
        props.doTask({
            "variables":
                {"loops": {"value": number}}
        });
    };

    return <div>How many loops did you make? <NumberButtons handler={numberHandler} amount="10"/></div>
}

function DeleteLoopsTask(props) {
    const numberHandler = number => {
        props.doTask({
            "variables":
                {"deleted": {"value": number}}
        });
    };

    return <div>How many loops did you delete? <NumberButtons handler={numberHandler} amount="10"/></div>
}

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

function waitForTasks(id, callback) {
    const startIntervalMs = 100;
    const pollIntervalMs = 1000;
    const key = 'song-' + id;

    const callApi = function () {
        process.getTasks(key,
            (tasks) => {callback(tasks[0])},
            () => {setTimeout(callApi, pollIntervalMs)});
    };
    setTimeout(callApi, startIntervalMs);
}

export default App;
