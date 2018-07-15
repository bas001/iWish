function unfold(uuid) {
    if (uuid === "undefined") {
        return;
    }
    var toggles = document.getElementsByClassName('toggle');
    [].forEach.call(toggles, function (el) {el.setAttribute('data-visible', "false")});
    document.getElementById(uuid).setAttribute('data-visible', "true");
}