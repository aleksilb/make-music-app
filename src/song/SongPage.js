import React from "react";
import SongList from "./SongList";
import NewSong from "./NewSong";
import * as process from "../process";

function SongPage(props) {
    const songSelectHandler = props.songSelectHandler;

    const startSong = song => {
        process.startSong(song.id)
            .then(() => {songSelectHandler(song)});
    }

    return <div>
        Start by selecting or creating a song.
        <SongList songSelectHandler={songSelectHandler}/>
        <NewSong createHandler={startSong}/>
    </div>
}

export default SongPage;