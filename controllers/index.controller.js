module.exports = {
    getHomePage: async (req, res, next) => {
        res.render('index');
    },
    getLoginPage: (req, res, next) => res.redirect('/users/login'),
    getRegisterPage: (req, res, next) => res.redirect('/users/register'),
    getWrongPage: (req, res, next) => res.render('notfound'),
}