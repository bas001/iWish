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

function commentKeyupEvent(uuid) {
    if (event.keyCode === 13) {
        postComment(uuid)
    }
}

function showPubshlishModal(wishlistId) {
    // initialize modal element
    let modalEl = document.createElement('div');
    modalEl.style.width = '400px';
    modalEl.style.height = '400px';
    modalEl.style.margin = '100px auto';
    modalEl.style.backgroundColor = '#fff';
    modalEl.style.textAlign = "center";
    modalEl.style.padding = "20px";

    let par1 = document.createElement("p");
    par1.style.fontSize = "30px";
    par1.innerHTML = "Are you sure you want to publish this wishlist?";
    let par2 = document.createElement("p");
    par2.style.fontSize = "30px";
    par2.innerHTML = "Once published a wishlist cannot be edited anymore.";
    let okButton = document.createElement("button");
    okButton.className = "mui-btn mui-btn--primary";
    okButton.innerHTML = "ok";
    okButton.name = "okButton";
    okButton.onclick = function () {
        publishWishlist(wishlistId);
        mui.overlay('off');
    };

    let cancelButton = document.createElement("button");
    cancelButton.className = "mui-btn mui-btn--primary";
    cancelButton.innerHTML = "cancel";
    cancelButton.name = "cancelButton";
    cancelButton.onclick = function () {
        mui.overlay('off');
    };

    modalEl.appendChild(par1);
    modalEl.appendChild(par2);
    modalEl.appendChild(okButton);
    modalEl.appendChild(cancelButton);

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
    postData('/wishlist/1/item/comment', {uuid: uuid, comment: comment})
        .then(data => console.log(data)) // JSON from `response.json()` call
        .catch(error => console.error(error));
}
