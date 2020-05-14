import React from 'react';
import TaskHandler from "./TaskHandler";

function TaskPage({song, songStopHandler, updateSongHandler}) {
    const stopSong = () => {
        songStopHandler();
    }

    return (
        <div>
            <div>Song: {song.name}</div>
            <button onClick={stopSong}>Stop doing this song</button>
            <TaskHandler song={song} updateSongHandler={updateSongHandler}/>
        </div>
    );
}

export default TaskPage;