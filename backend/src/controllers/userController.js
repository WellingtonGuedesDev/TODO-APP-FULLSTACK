const { ok, badRequest, serverError } = require('../utils/httpResponse.js');
const { ValidateParams } = require('../utils/validate.js')
const { EncriptPass } = require('../utils/hash.js')
const { UsersDataAcess } = require('../models/users.js')
const jwt = require('jsonwebtoken');


class UserController {
    constructor() {
        this.dataAcess = new UsersDataAcess();
        this.validateParams = new ValidateParams();
        this.hash = new EncriptPass();
    }

    async userRegister(user) {
        if (!this.validateParams.validateEmail(user.email)) return badRequest('Email ou senha invalida');
        if (!this.validateParams.validatePassword(user.password)) return badRequest('Email ou senha invalida');

        const userExist = await this.dataAcess.checkUserExist(user)
        if (userExist) return badRequest('Usuario ja existe!')

        const hashPass = await this.hash.hashPassword(user.password)
        const result = await this.dataAcess.addUser({ email: user.email, hash: hashPass });

        return ok('Usuario criado com sucesso')
    }

    async userLogin(user) {
        if (!this.validateParams.validateEmail(user.email)) return badRequest('Email ou senha invalida');
        if (!this.validateParams.validatePassword(user.password)) return badRequest('Email ou senha invalida');

        const userData = await this.dataAcess.checkUserExist({ email: user.email });
        if (!userData) return badRequest('Usuario não existe!')

        const checkPass = await this.hash.checkPassword(userData.hash, user.password);

        if(!checkPass) return badRequest('Email ou senha invalida');

        const token = jwt.sign({ id: userData._id }, process.env.JWT_SECRET);

        const status = ok('Usuario Logado')
        return { status, token }
    }
}

module.exports = { UserController }