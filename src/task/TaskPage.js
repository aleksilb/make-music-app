import React, {useState} from 'react';
import TaskHandler from "./TaskHandler";

function TaskPage({song, songStopHandler}) {
    const [active, setActive] = useState(true);

    const stopSong = () => {
        setActive(false);
        songStopHandler();
    }

    return (
        <div>
            <div>Song: {song.name}</div>
            <button onClick={stopSong}>Stop doing this song</button>
            <TaskHandler song={song} active={active}/>
        </div>
    );
}

export default TaskPage;