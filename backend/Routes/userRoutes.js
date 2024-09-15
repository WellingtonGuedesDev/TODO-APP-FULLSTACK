const express = require('express');
const Router = express.Router();

const { registerUser } = require('../models/userModel');

Router.post('/signup', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.send({
            success: false,
            statusCode: 400,
            message: 'Email e senha são obrigatórios'
        })
    }

    const userExist = await registerUser({ email, password });
    console.log('userExist: ', userExist)

    if (userExist === 400) {
        return res.send({
            success: false,
            statusCode: 400,
            error: "Email ou senha inválidos"
        })
    }

    if (userExist === 'Usuario já cadastrado') {
        return res.send({
            success: false,
            statusCode: 400,
            error: 'Usuário já cadastrado'
        })
    }

    return res.send({
        success: true,
        statusCode: 200,
        message: 'Usuário cadastrado com sucesso'
    })

})

Router.get('/login', async (req, res) => {
    return res.send({
        success: true,
        statusCode: 200,
        message: 'Login realizado com sucesso'
    })
})

module.exports = Router;