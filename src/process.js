export function startSong(id, callback) {
    const callProperties = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'}
    };

    fetch("http://localhost:8080/make-music/song/" + id + "/start", callProperties)
        .then(() => {
            callback();
        });
}

export function createSong(name, callback) {
    const body = JSON.stringify({name : name});

    const callProperties = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: body
    };

    fetch("http://localhost:8080/make-music/song", callProperties)
        .then(res => res.json())
        .then(song => {
            callback(song);
        });
}

export function doTask(taskId, variables, callback) {
    const body = variables != null ? JSON.stringify(variables) : null;

    const callProperties = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: body
    };

    fetch("http://localhost:8080/engine-rest/task/" + taskId + "/complete", callProperties)
        .then(() => {
            callback();
        });
}

export function getTasks(songId, successCallback, failCallback) {
    const key = 'song-' + songId;

    fetch("http://localhost:8080/engine-rest/task?processInstanceBusinessKey=" + key)
        .then(res => res.json())
        .then(
            (result) => {
                let tasks = result;
                if (tasks.length > 0) {
                    successCallback(tasks);
                } else {
                    failCallback();
                }
            });
}

export function getSongs(callback) {
    fetch("http://localhost:8080/make-music/song")
        .then(res => res.json())
        .then(
            (result) => {
                let songs = result;
                callback(songs);
            });
}