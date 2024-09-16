const { Mongo } = require('../config/db.js');
const { ObjectId } = require('mongodb');

class TodoAcessData {
    constructor() {
        this.collectionName = 'todo';
        this.mongo = new Mongo();
        this.mongo.connect()
    }

    addTodo(data) {
        const result = this.mongo.client
        .db(process.env.MONGODB_NAME)
        .collection(this.collectionName)
        .insertOne(data);

        return result;
    }

    async getTodo(id) {
        const result = await this.mongo.client
        .db(process.env.MONGODB_NAME)
        .collection(this.collectionName)
        .find({ user_id: id })
        .toArray();

        return result;
    }

    async updateTodo(data) {
        const id = new ObjectId(data.id);
        const result = await this.mongo.client
        .db(process.env.MONGODB_NAME)
        .collection(this.collectionName)
        .updateOne({ _id: id }, { $set: { title: data.title, description: data.description, updated_at: data.updated_at } });

        return result;
    }

    async deleteTodo(data) {
        const id = new ObjectId(data.id);
        const result = await this.mongo.client
        .db(process.env.MONGODB_NAME)
        .collection(this.collectionName)
        .deleteOne({ _id: id, user_id: data.user_id });

        return result;
    }

    async deleteAllTodo(data) {
        const result = await this.mongo.client
        .db(process.env.MONGODB_NAME)
        .collection(this.collectionName)
        .deleteMany({ user_id: data.user_id });

        return result;
    }
}

module.exports = { TodoAcessData }