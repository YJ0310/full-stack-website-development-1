// Promises make code more readable
function getUserData(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const user = { id: userId, name: 'John' };
            resolve(user);
        }, 1000);
    });
}

function getUserPosts(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const posts = [{ id: 1, title: 'Post 1' }];
            resolve(posts);
        }, 1000);
    });
}

// Chain promises
getUserData(1)
    .then(user => {
        console.log(user);
        return getUserPosts(user.id);
    })
    .then(posts => {
        console.log(posts);
    })
    .catch(err => {
        console.error(err);
    });

module.exports = {
    getUserData,
    getUserPosts,
    getDataAndPosts: async function(userId) {
        try {
            const user = await getUserData(userId);
            console.log(user);
            const posts = await getUserPosts(user.id);
            console.log(posts);
        } catch (error) {
            console.error(error);
        };
    }
}