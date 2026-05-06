const Login = require('../models/LoginModel');

exports.index = (req, res) => {
    if(req.session.user) return res.render('login-auth');
    res.render('login');
}

exports.register = async (req, res) => {
    try {
        const login = new Login(req.body);
        await login.register();

        if (login.errors.length > 0) {
            req.flash('errors', login.errors);
            req.session.save(function () {
                return res.redirect('/auth/index');
            });
            return;
        }
        req.flash('success', 'Sua conta foi criada com sucesso!');
        req.session.save(function () {
            return res.redirect('/auth/index');
        });
    } catch (e) {
        console.log(e);
        return res.render('404');
    }

}
exports.login = async (req, res) => {
    try {
        const login = new Login(req.body);
        await login.signin();

        if (login.errors.length > 0) {
            req.flash('errors', login.errors);
            req.session.save(function () {
                return res.redirect('/auth/index');
            });
            return;
        }
        req.flash('success', 'Você entrou no sistema!');
        req.session.user = login.user;
        req.session.save(function () {
            return res.redirect('/auth/index');
        });
    } catch (e) {
        console.log(e);
        return res.render('404');
    }

}

exports.logout = (req,res) => {
    req.session.destroy();
    res.redirect('/');
}