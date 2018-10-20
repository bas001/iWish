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
    let item = document.getElementById(uuid);
    if (!item) {
        return;
    }
    let visible = item.getAttribute('data-visible');
    let toggles = document.getElementsByClassName('toggle');
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
