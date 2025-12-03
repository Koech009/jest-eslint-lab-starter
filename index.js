/* global module */

function capitalizeWords(input) {
    return input.replace(/\b\w/g, char => char.toUpperCase());
}

function filterActiveUsers(users) {
    return users.filter(user => user.active);
}

function logAction(action, username) {
    return `Action: ${action}, User: ${username}`;
}

module.exports = { capitalizeWords, filterActiveUsers, logAction };
