import React, {useState} from 'react';
import SongPage from "./song/SongPage";
import TaskPage from "./task/TaskPage";

function App() {
    const [song, setSong] = useState(null);

    const songSelectHandler = song => {
        setSong(song);
    }

    const songStopHandler = () => {
        setSong(null);
    }

    return (
        <div className="App">
            {song != null ? <TaskPage song={song} songStopHandler={songStopHandler}/> : <SongPage songSelectHandler={songSelectHandler}/>}
        </div>
    );
}

export default App;
