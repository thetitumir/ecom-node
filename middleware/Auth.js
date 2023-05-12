function Auth(req, res, next) {
    if(req.session.user === undefined) {
        res.redirect('/login');
    }
    next();
}

module.exports = Auth;