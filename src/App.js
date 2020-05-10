import React, {useState} from 'react';
import TaskHandler from "./task/TaskHandler";
import SongPage from "./song/SongPage";

function App() {
    const [song, setSong] = useState(null);

    const songSelectHandler = song => {
        setSong(song);
    }

    return (
        <div className="App">
            {song != null ? <TaskHandler song={song}/> : <SongPage songSelectHandler={songSelectHandler}/>}
        </div>
    );
}

export default App;
