const { ok, badRequest, serverError } = require('./httpResponse.js');
const bcrypt = require('bcrypt');

class ValidateParams {
    constructor() {
        
    }

    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const emailValid = emailRegex.test(email);

        return emailValid;
    }

    validatePassword(password) {
        const passwordRegex = /^.{8,}$/; ///^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        return passwordRegex.test(password);
    }
}

module.exports = { ValidateParams }
