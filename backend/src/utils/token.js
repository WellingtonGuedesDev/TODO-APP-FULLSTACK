const jwt = require('jsonwebtoken');

class Jwt {
    constructor() {
        this.KEY = process.env.JWT_SECRET;
    }

    verifyToken(token) {
        const decoded = jwt.verify(token, this.KEY);

        return decoded;
    }
}