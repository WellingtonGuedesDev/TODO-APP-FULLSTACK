const bcrypt = require('bcrypt');
const { Mongo } = require('../config/db.js')
const jwt = require('jsonwebtoken');


const saltRounds = 10;

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailValid = emailRegex.test(email);

    return emailValid;
}

function validatePassword(password) {
    const passwordRegex = /^.{8,}$/; ///^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    return passwordRegex.test(password);
}

async function hashPassword(password) {
    try {
        const hash = await bcrypt.hash(password, saltRounds);
        return hash;
    } catch (error) {
        console.log('Error ao criptofar a senha: ', error)
        return 500;
    }
}

async function checkPassword(password) {
    try {
        const hash = await hashPassword(password);
        const match = await bcrypt.compare(password, hash);

        if (!match) return 'Senha Incorreta...';

        return hash;
    } catch (error) {
        console.log('Erro ao comparar senha: ', error);
        return 500;
    }
}

async function checkUserExist(email) {
    const mongo = await Mongo.connect(process.env.STRING_CONNECTION, process.env.MONGODB_NAME);
    const collectionName = 'users';

    try {
        const users = await mongo.collection(collectionName);

        const user = await users.findOne({ email: email });
        
        if (!user) return false;

        return true;
    } catch (error) {
        console.log('Error ao verificar se usuario existe: ', error);
        return 500
    }
}

async function registerUser(user) {
    try {
        if (!validateEmail(user.email)) return 400;
        if (!validatePassword(user.password)) return 400;

        const mongo = await Mongo.connect(process.env.STRING_CONNECTION, process.env.MONGODB_NAME);
        const collectionName = 'users';

        const userExist = await checkUserExist(user.email);
        const hash = await checkPassword(user.password);

        if (userExist) return 'Usuario já cadastrado';

        const newUser = {
            email: user.email,
            password: hash,
            createdAt: new Date()
        }

        console.log('newUser: ', newUser)
        const result = await mongo.collection(collectionName).insertOne(newUser);

        if (result.insertedId) {
            const user = await mongo.collection(collectionName).findOne({ _id: result.insertedId });

            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

            console.log('usuario cadastrado com sucesso')
        }

    } catch (error) {
        console.log('Error ao registrar usuario: ', error);
        return 500;
    }
}



module.exports = { registerUser }