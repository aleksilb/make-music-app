import React, {useState} from 'react';
import * as process from './process.js';
import TaskHandler from "./task/TaskHandler";
import NewSong from "./song/NewSong";

function App() {
    const [song, setSong] = useState(null);

    const songCreated = newSong => {
        startSong(newSong);
    };

    const startSong = song => {
        process.startSong(song.id, () => {setSong(song)});
    }

    return (
        <div className="App">
            {song != null ? <TaskHandler song={song}/> : <NewSong handleCreate={songCreated}/>}
        </div>
    );
}

export default App;
