//dashboard
function post(user) {
    postData('/wishlist', {user: user})
        .then(data => console.log(data))
        .catch(error => console.error(error));
}

function getWishlist(_id) {
    getData('/wishlist/' +_id)
        .then(data => console.log(data))
        .catch(error => console.error(error));
}


//wishlist

function unfold(uuid) {
    if (uuid === "undefined") {
        return;
    }
    var toggles = document.getElementsByClassName('toggle');
    var state = document.getElementById(uuid).getAttribute('data-visible');
    [].forEach.call(toggles, function (el) {
        el.setAttribute('data-visible', "false")
    });
    if (state === "false") {
        document.getElementById(uuid).setAttribute('data-visible', "true");
    }
}

function removeWish(uuid) {
    updateData('/wishlist/1/item/', {uuid: uuid})
        .then(data => console.log(data))
        .catch(error => console.error(error));
}


function postComment(uuid) {

    var comment = document.getElementById(uuid).getElementsByTagName("input")[0].value;
    postData('/wishlist/1/item/comment', {uuid: uuid, comment: comment})
        .then(data => console.log(data)) // JSON from `response.json()` call
        .catch(error => console.error(error));

}

const getData = (url = ``) => {
    // Default options are marked with *
    return fetch(url, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, same-origin, *omit
        redirect: "follow", // manual, *follow, error
        referrer: "no-referrer"
    })
        .then(response => response.text()) // parses response to JSON
        .then(data => document.write(data)) // parses response to JSON
        .catch(error => console.error(`Fetch Error =\n`, error));
};

const postData = (url = ``, data = {}) => {
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
};

const updateData = (url = ``, data = {}) => {
    // Default options are marked with *
    return fetch(url, {
        method: "PUT", // *GET, POST, PUT, DELETE, etc.
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
};


