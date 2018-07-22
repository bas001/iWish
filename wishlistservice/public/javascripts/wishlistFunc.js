function unfold(uuid) {
    if (uuid === "undefined") {
        return;
    }
    var toggles = document.getElementsByClassName('toggle');
    var state = document.getElementById(uuid).getAttribute('data-visible');
    [].forEach.call(toggles, function (el) {el.setAttribute('data-visible', "false")});
    if (state === "false") {
        document.getElementById(uuid).setAttribute('data-visible', "true");
    }
}

function post(uuid) {

    var comment = document.getElementById(uuid).getElementsByTagName("input")[0].value;
    postData('/wishlist/1/item/comment', {uuid: uuid, comment: comment})
        .then(data => console.log(data)) // JSON from `response.json()` call
        .catch(error => console.error(error));

}
const postData = (url = ``, data = {}) => {
    // Default options are marked with *
    return fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, same-origin, *omit
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            // "Content-Type": "application/x-www-form-urlencoded",
        },
        redirect: "follow", // manual, *follow, error
        referrer: "no-referrer", // no-referrer, *client
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
        .then(response => window.location.reload()) // parses response to JSON
.catch(error => console.error(`Fetch Error =\n`, error));
};


