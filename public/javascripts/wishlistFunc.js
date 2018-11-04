// wishlist
window.onload = function () {
    let openItem = getCookie("open-item");
    toggle(openItem);

    let html = document.documentElement.innerHTML;
    document.write(linkify(html));
};

function toggle(uuid) {
    if (uuid === "undefined") {
        return;
    }
    let toShow = document.getElementById(uuid);
    if (!toShow) {
        return;
    }
    let toggles = document.getElementsByClassName('toggle');
    [].forEach.call(toggles, function (el) {
        el.setAttribute('data-visible', "false")
    });

    let visible = toShow.getAttribute('data-visible');
    if (visible === "false") {
        document.getElementById(uuid).setAttribute('data-visible', "true");
        setCookie("open-item", uuid)
    } else {
        setCookie("open-item", "undefined")
    }

    let toggleBtns = document.getElementsByClassName('toggle-btn');
    [].forEach.call(toggleBtns, function (el) {
        el.setAttribute('data-visible', "true")
    });
    document.getElementById("btn-" + uuid).setAttribute('data-visible', "false");

}

function commentKeyupEvent(uuid) {
    if (event.keyCode === 13) {
        postComment(uuid)
    }
}

function checkWish(wishId, checked) {
    patchData('/wishlist/x/item', {uuid: wishId, checked: checked})
        .then(data => console.log(data))
        .catch(error => console.error(error));
}

function showPubshlishModal(wishlistId) {
    // initialize modal element
    let modalEl = document.createElement('div');
    modalEl.style.width = '400px';
    modalEl.style.height = '300px';
    modalEl.style.margin = '100px auto';
    modalEl.style.backgroundColor = '#fff';
    modalEl.style.textAlign = "center";
    modalEl.style.padding = "20px";
    modalEl.style.position = "relative";

    let par1 = document.createElement("p");
    par1.style.fontSize = "30px";
    par1.innerHTML = "Are you sure you want to publish this wishlist?";
    let par2 = document.createElement("p");
    par2.style.fontSize = "30px";
    par2.innerHTML = "Once published a wishlist cannot be edited anymore.";
    let okButton = document.createElement("button");
    okButton.className = "waves-effect waves-light btn-large";
    okButton.innerHTML = "ok";
    okButton.name = "okButton";
    okButton.onclick = function () {
        publishWishlist(wishlistId);
        mui.overlay('off');
    };

    let cancelButton = document.createElement("button");
    cancelButton.className = "waves-effect waves-light btn-large";
    cancelButton.innerHTML = "cancel";
    cancelButton.name = "cancelButton";
    cancelButton.style.marginLeft = "175px";
    cancelButton.onclick = function () {
        mui.overlay('off');
    };

    let div = document.createElement("div");
    div.style.position= "absolute";
    div.style.bottom= "10px";
    div.appendChild(okButton);
    div.appendChild(cancelButton);

    modalEl.appendChild(par1);
    modalEl.appendChild(par2);
    modalEl.appendChild(div);

    // show modal
    mui.overlay('on', modalEl);
}

function publishWishlist(wishlistId) {
    patchData('/wishlist/' + wishlistId, {published: true})
        .then(data => console.log(data))
        .catch(error => console.error(error));
}

function removeWish(wishlistId, uuid) {
    deleteData('/wishlist/' + wishlistId + '/item/' + uuid)
        .then(data => console.log(data))
        .catch(error => console.error(error));
}

function postComment(uuid) {
    let comment = document.getElementById(uuid).getElementsByTagName("input")[0].value;
    postData('/wishlist/x/item/comment', {uuid: uuid, comment: comment})
        .then(data => console.log(data)) // JSON from `response.json()` call
        .catch(error => console.error(error));
}
