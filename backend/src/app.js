const express = require('express');
const cors = require('cors');
const Routes = require('../Routes/routes');
const UserRoutes = require('../Routes/userRoutes');
const { config } = require('dotenv');

const { Mongo } = require('../config/db.js');

config()
async function main() {
    const app = express();
    //const mongoConnection = await Mongo.connect(process.env.STRING_CONNECTION, process.env.MONGODB_NAME);

    app.use(express.json());
    app.use(cors());
    app.use('/', Routes);
    app.use('/auth', UserRoutes);
    
    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
        console.log(`Server is running on port http://localhost:${PORT}`);
    })
}

main();
