const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true }
}, { timestamps: true });

const LoginModel = mongoose.model('Login', UserSchema);

class Login {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.user = null;
    }

    async signin() {
        this.valid();
        if (this.errors.length > 0) return;
        this.user = await LoginModel.findOne({ email: this.body.email });

        if (!this.user) {
            this.errors.push('Usuário não existe.');
            return;
        }

        if (!bcryptjs.compareSync(this.body.password, this.user.password)) {
            this.errors.push('Senha inválida');
            this.user = null;
            return;
        }
    }

    async register() {
        this.valid();
        if (this.errors.length > 0) return;
        await this.userExist();
        if (this.errors.length > 0) return;
        const salt = bcryptjs.genSaltSync();
        this.body.password = bcryptjs.hashSync(this.body.password, salt);
        try {
            this.user = await LoginModel.create(this.body);
        } catch (e) {
            console.log(e);
        }
    }

    async userExist() {
        this.user = await LoginModel.findOne({ email: this.body.email });
        if (this.user) this.errors.push('Usuário já existe!');
    }
    valid() {
        this.cleanUp();
        //validar os campos
        //o email precisa ser válido
        if (!validator.isEmail(this.body.email)) this.errors.push('E-mail inválido.');
        //a senha tem que ter entre 3 e 50
        if (this.body.password.length < 3 || this.body.password.length > 50) this.errors.push('A senha deve ter entre 3 a 50 caracteres.');
    }
    cleanUp() {
        for (const key in this.body) {
            if (typeof this.body[key] !== 'string') this.body[key] = '';
        }
        this.body = {
            email: this.body.email,
            password: this.body.password
        }
    }

}

module.exports = Login;