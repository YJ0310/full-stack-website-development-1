const { getUserData, getUserPosts } = require('./promise.js');

// Async/await makes asynchronous code look synchronous
async function getDataAndPosts(userId) {
    try {
        const user = await getUserData(userId);
        console.log(user);
        
        const posts = await getUserPosts(user.id);
        console.log(posts);
    } catch (error) {
        console.error(error);
    }
}

getDataAndPosts(1);