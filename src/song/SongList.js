import * as process from "../process";
import React, {useEffect, useState} from "react";

function SongList(props) {
    const songSelectHandler = props.songSelectHandler;
    const [songs, setSongs] = useState(null);

    useEffect(() => {
        process.getSongs().then((songs) => {
            setSongs(songs);
        })
    }, []);

    const selectSong = song => {
        songSelectHandler(song);
    };

    return songs != null ?
        <table>
            <tbody>
            {songs.map(song => {return <tr key={song.id} onClick={selectSong.bind(this, song)}>
                    <td>{song.name}</td><td>{song.status}</td></tr>})}
            </tbody>
        </table>
        : null
}

export default SongList;