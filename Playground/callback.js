// Problem: Callback hell
function getUserData(userId, callback) {
    // Simulate API call
    setTimeout(() => {
        const user = { id: userId, name: 'John' };
        callback(null, user);
    }, 1000);
}

function getUserPosts(userId, callback) {
    setTimeout(() => {
        const posts = [{ id: 1, title: 'Post 1' }];
        callback(null, posts);
    }, 1000);
}

// This becomes messy quickly
getUserData(1, (err, user) => {
    if (err) {
        console.error(err);
        return;
    }
    getUserPosts(user.id, (err, posts) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(user, posts);
    });
});