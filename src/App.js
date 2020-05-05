import React, {useEffect, useState} from 'react';

function App() {
    return (
        <div className="App">
            <TaskHandler/>
        </div>
    );
}

/**
 * @return {null}
 */
function TaskHandler() {
    const [task, setTask] = useState(null);

    const waitForNext = function () {
        setTask(null);
        waitForTasks('test', response => {
            setTask(response);
            console.log(task);
        });
    };

    const getComponent = function (task) {
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

    useEffect(waitForNext,[]);

    const doTask = variables => {
        const body = variables != null ? JSON.stringify(variables) : null;

        const callProperties = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: body
        };

        fetch("http://localhost:8080/engine-rest/task/" + task.id + "/complete", callProperties)
            .then((response) => {
                console.log(response);
                waitForNext();
            });
    };

    if (task == null) {
        return <div>No tasks</div>
    } else {
        const TaskComponent = getComponent(task);
        return <div><TaskComponent doTask={doTask}/></div>
    }
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

function waitForTasks(key, callback) {
    const pollIntervalMs = 2000;
    let tasks = [];

    const callApi = function () {
        fetch("http://localhost:8080/engine-rest/task?processDefinitionKey=make_loop")
            .then(res => res.json())
            .then(
                (result) => {
                    tasks = result;
                });

        if (tasks.length > 0) {
            callback(tasks[0]);
        } else {
            return setTimeout(callApi, pollIntervalMs);
        }
    };
    callApi();
}

export default App;
