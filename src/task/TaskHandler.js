import React, {useEffect, useRef, useState} from "react";
import plingSound from "../pling.wav";
import * as process from "../process";
import {
    HowManyLoopsTask,
    StartMakingLoopsTask,
    ChooseBestTask,
    DeleteLoopsTask,
    ChooseInstrument,
    AddMoreInstruments,
    MakeMoreScenes
} from "./Tasks";

function playAlarm() {
    let audio = new Audio(plingSound);
    audio.play();
}

function TaskHandler({song, updateSongHandler}) {
    const [task, setTask] = useState(null);
    const [reminder, setReminder] = useState(false);
    const timerRef = useRef(null);

    useEffect(() => {
        const REMINDER_TIME = 5 * 60 * 1000;
        // const REMINDER_TIME = 10 * 1000;
        const REMINDER_HIDE_TIME = 5 * 1000;
        let hideReminderTimer = null;
        let showReminderTimer = null;
        setReminder(false);

        const remind = () => {
            playAlarm();
            setReminder(true);
            hideReminderTimer = setTimeout(() => setReminder(false), REMINDER_HIDE_TIME);
            showReminderTimer = setTimeout(remind, REMINDER_TIME);
        }

        if (task == null) {
            waitForTasks(song.id, newTask => {
                setTask(newTask);
            }, timerRef);
        } else {
            playAlarm();
            showReminderTimer = setTimeout(remind, REMINDER_TIME);
        }

        return () => {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            clearTimeout(timerRef.current);
            clearTimeout(showReminderTimer);
            clearTimeout(hideReminderTimer);
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
            case 'make-more-scenes':
                return MakeMoreScenes;
            default:
                return null;
        }
    }

    const TaskComponent = (task != null) ? getTaskComponent(task.formKey) : null;
    return <div>{reminder ? <div>Back to work!</div> : null}{(TaskComponent != null) ? <TaskComponent doTask={doTask} song={song} task={task}/> : "Waiting for next task"}</div>
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