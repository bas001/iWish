
function deleteData (url = ``) {
    return fetch(url, {
        method: "DELETE",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        redirect: "follow",
        referrer: "no-referrer"
    })
        .then(response => window.location.reload()) // parses response to JSON
        .catch(error => console.error(`Fetch Error =\n`, error));
}


function patchData (url = ``, data = {}) {
    return fetch(url, {
        method: "PATCH",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        redirect: "follow",
        referrer: "no-referrer"
    })
        .then(response => window.location.reload()) // parses response to JSON
        .catch(error => console.error(`Fetch Error =\n`, error));
}

function postData (url = ``, data = {}) {
    // Default options are marked with *
    return fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, same-origin, *omit
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        redirect: "follow", // manual, *follow, error
        referrer: "no-referrer", // no-referrer, *client
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
        .then(response => window.location.reload()) // parses response to JSON
        .catch(error => console.error(`Fetch Error =\n`, error));
}
