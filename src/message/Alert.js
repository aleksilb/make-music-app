import React, {useEffect, useState} from 'react';
import * as process from "../process";

function Alert() {
    const [alert, setAlert] = useState(null);

    useEffect(() => {
        process.onAlert(alert => {
            setAlert(alert);
        })
    });

    return (
        <div>{alert}</div>
    );
}

export default Alert;