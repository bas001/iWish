//dashboard
function post(user) {
    postData('/wishlist', {user: user})
        .then(data => console.log(data))
        .catch(error => console.error(error));
}

// wishlist
window.onload = function () {
    let openItem = getCookie("open-item");
    unfold(openItem);

    let html = document.documentElement.innerHTML;
    document.write(linkify(html));
};

function unfold(uuid) {
    if (uuid === "undefined") {
        return;
    }
    let toggles = document.getElementsByClassName('toggle');
    let visible = document.getElementById(uuid).getAttribute('data-visible');
    [].forEach.call(toggles, function (el) {
        el.setAttribute('data-visible', "false")
    });
    if (visible === "false") {
        document.getElementById(uuid).setAttribute('data-visible', "true");
        setCookie("open-item", uuid)
    } else {
        setCookie("open-item", "undefined")
    }

}

function removeWish(wishlistId, uuid) {
    deleteItem('/wishlist/' + wishlistId + '/item/' + uuid)
        .then(data => console.log(data))
        .catch(error => console.error(error));
}

function postComment(uuid) {
    let comment = document.getElementById(uuid).getElementsByTagName("input")[0].value;
    postData('/wishlist/1/item/comment', {uuid: uuid, comment: comment})
        .then(data => console.log(data)) // JSON from `response.json()` call
        .catch(error => console.error(error));
}

function deleteItem (url = ``) {
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
