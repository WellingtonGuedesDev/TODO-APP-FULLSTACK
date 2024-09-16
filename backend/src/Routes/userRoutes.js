const express = require('express');
const Routes = express.Router();
const {  UserController } = require('../controllers/userController.js');
const { ok } = require('../utils/httpResponse.js');

Routes.post('/signup', async (req, res) => {
    const { email, password } = req.body

    const user = new UserController()
    const result = await user.userRegister({ email, password })
    console.log('result: ', result)

    res.send(result)
})

Routes.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = new UserController()
    const result = await user.userLogin({ email, password })

    res.send({
        status: result.status,
        token: result.token        
    })
})  

module.exports = Routes