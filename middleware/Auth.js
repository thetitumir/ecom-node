function Auth(req, res, next) {
    if (req.session.user === undefined) {
        // req.session.user = {
        //     _id: "646c8bf6e7424c03d3da5bc2",
        //     name: 'Sharif',
        //     email: 'test@test.com',
        //     password: '$2b$10$Fcvx1fSnar1zX/WIQPrYweVHd/SyO12SD4WoWYBuEA7s26fjgE84i',
        //     role: 'admin',
        //     status: 'active',
        //     __v: 0
        // };
        return res.redirect('/login');
    }
    next();
}

module.exports = Auth;