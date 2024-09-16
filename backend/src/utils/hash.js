const bcrypt = require('bcrypt');
const { serverError } = require('../utils/httpResponse')

class EncriptPass {
    constructor() {
        this.saltRounds = 10;
    }

    async hashPassword(password) {
        try {
            const hash = await bcrypt.hash(password, this.saltRounds);
            return hash;
        } catch (error) {
            console.log('Error ao criptofar a senha: ', error)
            return serverError('Erro no servidor');
        }
    }

    async checkPassword(hash, password) {
        console.log(hash, password)
        try {
            const match = await bcrypt.compare(password, hash);

            if (!match) return false;

            return true;

        } catch (error) {
            console.log('Erro ao comparar senha: ', error);
            return serverError('Erro no servidor');
        }
    }
}

module.exports = { EncriptPass }