import React, {useEffect, useRef, useState} from "react";
import plingSound from "../pling.wav";
import * as process from "../process";
import {
    HowManyLoopsTask,
    StartMakingLoopsTask,
    ChooseBestTask,
    DeleteLoopsTask,
    ChooseInstrument,
    AddMoreInstruments
} from "./Tasks";

function TaskHandler({song, updateSongHandler}) {
    const [task, setTask] = useState(null);
    const timerRef = useRef(null);

    const handleNewTask = newTask => {
        setTask(newTask);
        let audio = new Audio(plingSound);
        audio.play();
    };

    useEffect(() => {
        waitForTasks(song.id, response => {
            handleNewTask(response);
        }, timerRef);

        return () => {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            clearTimeout(timerRef.current);
        }
    }, [song.id]);

    const doTask = variables => {
        process.doTask(task.id, variables)
            .then(() => {
                setTask(null);
                waitForTasks(song.id, response => {
                    handleNewTask(response);
                }, timerRef);
                updateSongHandler();
            });
    };

    const getTaskComponent = formKey => {
        switch (formKey) {
            case 'how-many-loops':
                return HowManyLoopsTask;
            case 'start-making-loops':
                return StartMakingLoopsTask;
            case 'choose-best':
                return ChooseBestTask;
            case 'delete-loops':
                return DeleteLoopsTask;
            case 'choose-instrument':
                return ChooseInstrument;
            case 'add-more-instruments':
                return AddMoreInstruments;
            default:
                return null;
        }
    }

    const TaskComponent = (task != null) ? getTaskComponent(task.formKey) : null;
    return <div>{(TaskComponent != null) ? <TaskComponent doTask={doTask} song={song} /> : "Waiting for next task"}</div>
}

function waitForTasks(songId, callback, timerRef) {
    const startIntervalMs = 100;
    const pollIntervalMs = 1000;

    const callApi = () => {
        process.getSongTasks(songId)
            .then(tasks => {
                if (tasks.length > 0) {
                    callback(tasks[0])
                } else {
                    timerRef.current = setTimeout(callApi, pollIntervalMs);
                }
            });
    };
    timerRef.current = setTimeout(callApi, startIntervalMs);
}

export default TaskHandler;