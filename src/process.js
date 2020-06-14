const CAMUNDA_API_URL = "http://localhost:8010/proxy/rest";
const API_URL = "http://localhost:8010/proxy";

export function startSong(id) {
    const callProperties = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'}
    };

    return fetch(API_URL + "/song/" + id + "/start", callProperties);
}

export function createSong(name) {
    const body = JSON.stringify({name : name});

    const callProperties = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: body
    };

    return fetch(API_URL + "/song", callProperties)
        .then(res => res.json());
}

export function doTask(taskId, variables) {
    let body = null;
    if(variables != null) {
        const camundaVars = {};

        for(let [name, value] of Object.entries(variables)) {
            camundaVars[name] = {value: value};
        }

        body = JSON.stringify({variables: camundaVars});
    }

    const callProperties = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: body
    };

    return fetch(CAMUNDA_API_URL + "/task/" + taskId + "/complete", callProperties);
}

export function getSongTasks(songId) {
    const key = 'song-' + songId;

    return fetch(CAMUNDA_API_URL + "/task?processInstanceBusinessKey=" + key)
        .then(res => res.json());
}

export function getTaskVariables(taskId) {
    return fetch(CAMUNDA_API_URL + "/task/"+taskId+"/form-variables")
        .then(res => res.json());
}

export function getNextTask(songId) {
    let task = null;

    return getSongTasks(songId)
        .then(tasks => {
            if (tasks.length > 0) {
                task = tasks[0];
                return getTaskVariables(task.id);
            } else {
                throw new Error("No tasks");
            }
        })
        .then(variables => {
            task.variables = variables;
            return task;
        });
}

export function getSongs() {
    return fetch(API_URL + "/song")
        .then(res => res.json());
}

export function getSong(id) {
    return fetch(API_URL + "/song/"+ id)
        .then(res => res.json());
}

export function deleteSong(id) {
    const callProperties = {
        method: 'DELETE'
    };

    return fetch(API_URL + "/song/" + id, callProperties);
}

export async function getInstruments() {
    return fetch(API_URL + "/instrument")
        .then(res => res.json());
}

export function updateSong(song) {
    const callProperties = {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(song)
    }

    return fetch(API_URL + "/song/"+song.id, callProperties);
}