import React, {useEffect, useState} from 'react';
import plingSound from './pling.wav';

function App() {
    const [song, setSong] = useState(null);

    const songCreated = newSong => {
        startSong(newSong);
    };

    const startSong = startSong => {
        const callProperties = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'}
        };

        fetch("http://localhost:8080/make-music/song/" + startSong.id + "/start", callProperties)
            .then(() => {
                setSong(startSong)
            });
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
        const body = JSON.stringify({name : songName});

        const callProperties = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: body
        };

        fetch("http://localhost:8080/make-music/song", callProperties)
            .then(res => res.json())
            .then(song => {
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

    const handleNewTask = newTask => {
        setTask(newTask);
        let audio = new Audio(plingSound);
        audio.play();
    };

    const waitForNext = () => {
        setTask(null);
        waitForTasks(props.song.id, response => {
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
        const body = variables != null ? JSON.stringify(variables) : null;

        const callProperties = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: body
        };

        fetch("http://localhost:8080/engine-rest/task/" + task.id + "/complete", callProperties)
            .then(() => {
                waitForNext();
            });
    };

    const TaskComponent = getComponent(task);
    return <div>
        <div>Song: {props.song.name}</div>
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
        fetch("http://localhost:8080/engine-rest/task?processInstanceBusinessKey=" + key)
            .then(res => res.json())
            .then(
                (result) => {
                    let tasks = result;
                    if (tasks.length > 0) {
                        callback(tasks[0]);
                    } else {
                        setTimeout(callApi, pollIntervalMs);
                    }
                });
    };
    setTimeout(callApi, startIntervalMs);
}

export default App;
