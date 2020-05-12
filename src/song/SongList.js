import * as process from "../process";
import React, {useEffect, useState} from "react";

function SongList(props) {
    const songSelectHandler = props.songSelectHandler;
    const [songs, setSongs] = useState(null);

    useEffect(() => {
        process.getSongs(songs => {
            setSongs(songs);
        })
    }, []);

    const selectSong = song => {
        songSelectHandler(song);
    };

    return <div>
        {songs != null ?
            <ul>{songs.map(song => {return <li key={song.id} onClick={selectSong.bind(this, song)}>{song.name}</li>})}</ul> : null
        }
    </div>
}

export default SongList;