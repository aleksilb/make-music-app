import React, {useState} from 'react';
import TaskHandler from "./TaskHandler";

function TaskPage(props) {
    const [active, setActive] = useState(true);

    const stopSong = () => {
        setActive(false);
        props.songStopHandler();
    }

    return (
        <div>
            <div>Song: {props.song.name}</div>
            <button onClick={stopSong}>Stop doing this song</button>
            <TaskHandler song={props.song} active={active}/>
        </div>
    );
}

export default TaskPage;