import React, {useState} from "react";
import * as process from "../process";

function NewSong(props) {
    const createHandler = props.createHandler;
    const [songName, setSongName] = useState('');

    const createSong = songName => {
        process.createSong(songName).then(song => {
            createHandler(song);
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

export default NewSong;