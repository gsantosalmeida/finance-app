const User = require('../models/User');

exports.showLogin = (res, req) => {
    if(req.session.user) return res.render('index');
    res.render('login');
}
exports.showRegister = (res, req) => {
    res.render('./auth/register');
}
exports.authLogin = async (res, req) => {
    try {
        const user = new Login(req.body);
        await user.signin();

        if (user.errors.length > 0) {
            req.flash('errors', user.errors);
            req.session.save(function () {
                return res.redirect('/auth/login');
            });
            return;
        }
        req.flash('success', 'Você entrou no sistema!');
        req.session.user = user.user;
        req.session.save(function () {
            return res.redirect('/auth/login');
        });
    } catch (e) {
        console.log(e);
        return res.render('404');
    }
}
exports.authRegister = async (res, req) => {
    try {
        const user = new User(req.body);
        await user.register();

        if (user.errors.length > 0) {
            req.flash('errors', user.errors);
            req.session.save(function () {
                return res.redirect('/auth/login');
            });
            return;
        }
        req.flash('success', 'Sua conta foi criada com sucesso!');
        req.session.save(function () {
            return res.redirect('/auth/login');
        });
    } catch (e) {
        console.log(e);
        return res.render('404');
    }

}
exports.authLogout = () => {

}