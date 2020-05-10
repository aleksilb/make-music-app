import React, {useEffect, useState} from "react";
import plingSound from "../pling.wav";
import * as process from "../process";
import {HowManyLoopsTask, StartMakingLoopsTask, ChooseBestTask, DeleteLoopsTask} from "./Tasks";

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

    const doTask = variables => {
        process.doTask(task.id, variables, () => {waitForNext();});
    };

    const TaskComponent = (task != null) ? getTaskComponent(task.taskDefinitionKey) : null;
    return <div>
        <div>Song: {song.name}</div>
        {TaskComponent != null ? <TaskComponent doTask={doTask}/> : "No tasks"}</div>
}

function getTaskComponent(taskKey) {
    switch (taskKey) {
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
}

function waitForTasks(id, callback) {
    const startIntervalMs = 100;
    const pollIntervalMs = 1000;

    const callApi = function () {
        process.getTasks(id,
            (tasks) => {callback(tasks[0])},
            () => {setTimeout(callApi, pollIntervalMs)});
    };
    setTimeout(callApi, startIntervalMs);
}

export default TaskHandler;