import * as process from "../process";
import React, {useEffect, useState} from "react";

function SongList({songSelectHandler}) {
    const [songs, setSongs] = useState(null);
    const [editing, setEditing] = useState(null);
    const [name, setName] = useState(null);

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

    const editName = id => {
        setEditing(id);
    }

    const saveName = id => {
        const song = songs.find(song => {return song.id === id});
        song.name = name;
        process.updateSong(song)
            .then(() => {
                setEditing(false);
            });
    }

    const nameChange = event => {
        setName(event.target.value);
    }

    return songs != null ?
        <table>
            <tbody>
            {songs.map(song => {return <tr key={song.id}>
                {editing !== song.id ? <td onClick={selectSong.bind(this, song)}>{song.name}</td> : <td><input type="text" onChange={nameChange}/></td>}
                <td>{song.status}</td>
                {editing !== song.id ? <td><button onClick={editName.bind(this, song.id)}>Edit</button></td> : <td><button onClick={saveName.bind(this, song.id)}>Save</button></td>}
                <td><button onClick={deleteSong.bind(this, song.id)}>Delete</button></td>
            </tr>})}
            </tbody>
        </table>
        : null
}

export default SongList;