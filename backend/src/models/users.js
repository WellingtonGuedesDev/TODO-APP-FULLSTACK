const { Mongo } = require('../config/db');

class UsersDataAcess {
    constructor() {
        this.collectionName = 'users'
        this.mongo = new Mongo()
        this.mongo.connect()
    }

    async getUser(user) {
        console.log('getUsers: ', user.email)
        const result = await this.mongo.client
        .db(process.env.MONGODB_NAME)
        .collection(this.collectionName)
        .findOne({ email: user.email.toLowerCase() });

        return result;
    }

    async addUser(user) {
        
        const { email, hash } = user;
        const result = await this.mongo.client
        .db(process.env.MONGODB_NAME)
        .collection(this.collectionName)
        .insertOne({ email: email.toLowerCase(), hash: hash });

        return result
    }

    async checkUserExist(user) {
        const result = await this.mongo.client
        .db(process.env.MONGODB_NAME)
        .collection(this.collectionName)
        .findOne({ email: user.email })

        return result
    }

    update() {

    }

    delete() {

    }
}

module.exports = { UsersDataAcess }