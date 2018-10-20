function post(user) {
    postData('/wishlist', {user: user})
        .then(data => console.log(data))
        .catch(error => console.error(error));
}