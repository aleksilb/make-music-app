import React, {useState} from 'react';
import SongPage from "./song/SongPage";
import TaskPage from "./task/TaskPage";
import * as process from "./process";
import Alert from "./message/Alert";

function App() {
    const [song, setSong] = useState(null);

    const songSelectHandler = song => {
        setSong(song);
    }

    const stopSong = () => {
        setSong(null);
    }

    const updateSong = () => {
        if(song != null) {
            process.getSong(song.id)
                .then(song => {
                    if(song.status === "FINISHED") {
                        stopSong();
                    } else {
                        setSong(song);
                    }
                });
        }
    }

    return (
        <div className="App">
            <Alert/>
            {song != null ?
                <TaskPage song={song} songStopHandler={stopSong} updateSongHandler={updateSong}/> :
                <SongPage songSelectHandler={songSelectHandler}/>}
        </div>
    );
}

export default App;
