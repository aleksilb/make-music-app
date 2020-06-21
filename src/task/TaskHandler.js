import React, {useEffect, useRef, useState} from "react";
import * as process from "../process";
import {
    ChooseInstrumentType, SimpleTask, YesNoTask
} from "./Tasks";


function TaskHandler({song, updateSongHandler}) {
    const [task, setTask] = useState(null);
    const timerRef = useRef(null);

    useEffect(() => {
        if (task == null) {
            waitForTasks(song.id, newTask => {
                setTask(newTask);
            }, timerRef);
        }

        return () => {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            clearTimeout(timerRef.current);
        }
    }, [song.id, task]);

    const doTask = variables => {
        process.doTask(task.id, variables)
            .then(() => {
                setTask(null);
                updateSongHandler();
            });
    };

    const getTaskComponent = formKey => {
        switch (formKey) {
            case 'simple-task':
                return SimpleTask;
            case 'yes-no-task':
                return YesNoTask;
            case 'choose-instrument-type':
                return ChooseInstrumentType;
            default:
                return null;
        }
    }

    const TaskComponent = (task != null) ? getTaskComponent(task.formKey) : null;
    return <div>{(TaskComponent != null) ? <TaskComponent doTask={doTask} song={song} task={task}/> : "Waiting for next task"}</div>
}

function waitForTasks(songId, callback, timerRef) {
    const startIntervalMs = 100;
    const pollIntervalMs = 1000;

    const callApi = () => {
        process.getNextTask(songId)
            .then(task => {
                if(task !== null) {
                    callback(task);
                } else {
                    timerRef.current = setTimeout(callApi, pollIntervalMs);
                }
            });
    };
    timerRef.current = setTimeout(callApi, startIntervalMs);
}

export default TaskHandler;