import * as process from "../process";
import React, {useEffect, useState} from "react";

function SongList({songSelectHandler}) {
    const [songs, setSongs] = useState(null);

    useEffect(() => {
        process.getSongs().then((songs) => {
            setSongs(songs);
        })
    }, []);

    const selectSong = song => {
        songSelectHandler(song);
    };

    const updateSongs = () => {
        process.getSongs().then((songs) => {
            setSongs(songs);
        })
    }

    const deleteSong = id => {
        process.deleteSong(id)
            .then(() => {
                updateSongs();
            });
    }

    return songs != null ?
        <table>
            <tbody>
            {songs.map(song => {return <tr key={song.id}>
                <td onClick={selectSong.bind(this, song)}>{song.name}</td>
                <td>{song.status}</td>
                <td><button onClick={deleteSong.bind(this, song.id)}>Delete</button></td>
            </tr>})}
            </tbody>
        </table>
        : null
}

export default SongList;