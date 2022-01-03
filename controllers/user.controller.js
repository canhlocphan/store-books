const passport = require("passport");
const userModel = require("../models/user.model");

module.exports = {
	// info user
	getAccountInfo: (req, res, next) =>
		res.render("user/my-account", { title: "Express" }),
	// login
	checkLogin: async (req, res, next) => {
		const password = req.body.password;
		const email = req.body.email;
		console.log(email);
		console.log(password);

		const loginStatus = await userModel.login(email, password);
		console.log("checkLogin", "loginStatus", loginStatus);
		if (loginStatus === 1) {
			res.redirect("/");
		} else {
			res.render("user/login", { error: true });
		}
	},
	login: (req, res, next) => {
		res.render("user/login");
	},
	checkLogin: async (req, res, next) => {
		const password = req.body.password;
		const email = req.body.email;
		console.log(email);
		console.log(password);

		const loginStatus = await userModel.login(email, password);
		console.log("checkLogin", "loginStatus", loginStatus);
		if (loginStatus === 1) {
			res.redirect("/");
		} else {
			res.render("user/login", { error: true });
		}
	},
	postLogin: async (req, res, next) => {
		passport.authenticate("local", async function (err, user, info) {
			if (err) {
				return next(err);
			}
			if (!user) {
				return res.redirect("/login");
			}

			req.logIn(user, async function (err) {
				if (err) return next(err);

				//update cart after login
				if (req.session.cart && req.session.cart.length > 0) {
					await userModel.updateCartAfterLogin(user._id, req.session.cart);
					req.session.cart = [];
				}

				return res.redirect("/");
			});
		})(req, res, next);
	},
	// register
	addNewAccount: async (req, res, next) => {
		const userInfo = req.body;
		const result = await userModel.addNewAccount(userInfo);

		res.redirect('/login');
	},
	register: (req, res, next) => res.render("user/register"),
	// logout
	logout: (req, res, next) => {
		req.logout();
		// req.session.cart = []
		res.redirect("/");
	},
};
