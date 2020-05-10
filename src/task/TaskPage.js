import React from 'react';
import TaskHandler from "./TaskHandler";

function TaskPage(props) {
    return (
        <div>
            <div>Song: {props.song.name}</div>
            <button onClick={props.songStopHandler}>Stop doing this song</button>
            <TaskHandler song={props.song}/>
        </div>
    );
}

export default TaskPage;