const ensureLoggedIn = require("connect-ensure-login").ensureLoggedIn;

const PROTECTED = ensureLoggedIn("/whodis");

module.exports = PROTECTED;
