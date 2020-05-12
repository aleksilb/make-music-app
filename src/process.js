const CAMUNDA_API_URL = "http://localhost:8010/proxy/rest";
const API_URL = "http://localhost:8010/proxy";

export function startSong(id, callback) {
    const callProperties = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'}
    };

    fetch(API_URL + "/song/" + id + "/start", callProperties)
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

    fetch(API_URL + "/song", callProperties)
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

    fetch(CAMUNDA_API_URL + "/task/" + taskId + "/complete", callProperties)
        .then(() => {
            callback();
        });
}

export function getTasks(songId, successCallback, failCallback) {
    const key = 'song-' + songId;

    fetch(CAMUNDA_API_URL + "/task?processInstanceBusinessKey=" + key)
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
    fetch(API_URL + "/song")
        .then(res => res.json())
        .then(
            (result) => {
                callback(result);
            });
}