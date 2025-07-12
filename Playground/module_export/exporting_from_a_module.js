// userUtils.js
function validateEmail(email) {
    return email.includes('@');
}

function hashPassword(password) {
    // Simplified hashing
    return password + '_hashed';
}

// Export individual functions
module.exports = {
    validateEmail,
    hashPassword
};

// Or export individually
// module.exports.validateEmail = validateEmail;
// module.exports.hashPassword = hashPassword;