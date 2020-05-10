import React from 'react';
import TaskHandler from "./TaskHandler";

function TaskPage(props) {
    return (
        <div>
            <div>Song: {props.song.name}</div>
            <TaskHandler song={props.song}/>
        </div>
    );
}

export default TaskPage;