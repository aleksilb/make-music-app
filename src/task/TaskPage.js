import React from 'react';
import TaskHandler from "./TaskHandler";
import Alert from "../message/Alert";

function TaskPage({song, songStopHandler, updateSongHandler}) {
    const stopSong = () => {
        songStopHandler();
    }

    return (
        <div>
            <Alert songId={song.id}/>
            <div>Song: {song.name}</div>
            <button onClick={stopSong}>Stop doing this song</button>
            <TaskHandler song={song} updateSongHandler={updateSongHandler}/>
        </div>
    );
}

export default TaskPage;