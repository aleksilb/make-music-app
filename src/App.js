import React, {useState} from 'react';
import * as process from './process.js';
import TaskHandler from "./task/TaskHandler";

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

function NewSong(props) {
    const [songName, setSongName] = useState('');

    const createSong = songName => {
        process.createSong(songName, song => {
            props.handleCreate(song);
        });
    };

    const handleNameChange = event => {
        setSongName(event.target.value);
    };

    const handleSubmit = event => {
        createSong(songName);
        event.preventDefault();
    };

    return <form onSubmit={handleSubmit}>
        <input type='text' value={songName} onChange={handleNameChange}/>
        <input type="submit" value="Start song" />
    </form>
}

export default App;
