const { MongoClient } = require('mongodb');

/*
const Mongo = {
    async connect(stringConnection, mongodbName) {
        try {
            const client = new MongoClient(stringConnection)
            await client.connect()
            const db = await client.db(mongodbName)
            console.log("Pinged your deployment. You successfully connected to MongoDB!");
            return db;
        } catch (error) {
            console.log("Ocorreu algum problema com a conexão com o bando de dados: ", error)
        }
    }
}
*/

class Mongo {
    constructor() {
        this.client = new MongoClient(process.env.STRING_CONNECTION)
    }

    async connect() {
        await this.client.connect()
        const db = this.client.db(process.env.MONGODB_NAME)
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
        return db;
    }
}

module.exports = { Mongo }
