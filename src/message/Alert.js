import React, {useEffect, useState} from 'react';
import * as process from "../process";
import alertSound from "../pling.wav";

function Alert({songId}) {
    const [alert, setAlert] = useState(null);
    let hideAlertTimer = null;
    const ALERT_HIDE_TIME = 5 * 1000;

    useEffect(() => {
        process.onAlert(songId, newAlert);

        return () => {
            clearTimeout(hideAlertTimer);
        }
    });

    const newAlert  = alert => {
        let audio = new Audio(alertSound);
        audio.play();
        setAlert(alert);
        hideAlertTimer = setTimeout(() => setAlert(null), ALERT_HIDE_TIME);
    }

    return <div>{alert}</div>;
}

export default Alert;