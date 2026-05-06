exports.middlewareGlobal = (req, res, next) => {
    res.locals.umaVariavelLocal = 'Este é o valor da variavel local.'
    next();
};
exports.outroMiddleware = (req, res, next) => {
    next();
};

exports.checkCSRFERROR = (err, req, res, next) =>{
    if(err && err.code === 'EBADCSRFTOKEN') return res.render('404'); 
}

exports.crsfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
}