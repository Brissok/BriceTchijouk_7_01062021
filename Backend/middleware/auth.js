const jwt = require('jsonwebtoken');
//const models = require('../models');
require('dotenv').config({ path: '../config/.env' });

// constant
//const maxAge = 3 * 24 * 60 * 60 * 1000;

module.exports = (req, res, next) => {
    try {
        const token = JSON.parse(localStorage.getItem('currentUser')).token;
        const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
        const userId = decodedToken.idUSERS;
        if (JSON.parse(localStorage.getItem('currentUser')).userId !== userId) {
            throw 'User ID non valable !';
        } else {
            next();
        }
    } catch (error) {
        res.status(401).json({ error: error | 'Requête non authentifiée !' });
    }
}; 


//* ******************** checkUser ******************** *//
/* exports.checkUser = (req, res, next) => {
	const token = JSON.parse(localStorage.getItem('currentUser')).token;
	console.log(token);
	if (token) {
		jwt.verify(token, process.env.TOKEN_KEY, async (err, decodedToken) => {
			if (err) {
				res.locals.user = null;
				res.cookie('jwt', '', { maxAge: 1 });
				next();
			} else {
				let user = await models.User.findOne({
					where: { id: decodedToken.id },
				});
				if (user) {
					res.locals.user = user;
					console.log(user);
					next();
				} else {
					res.status(400).send({ message: "l'utilisateur n'a pas été trouvé" });
				}
			}
		});
	} else {
		res.locals.user = null;
		next();
	}
}; */
//* ******************** checkUser end ******************** *//

//* ******************** requireAuth ******************** *//
/* exports.requireAuth = (req, res, next) => {
	const token = req.cookies.jwt;
	console.log(token);
	if (token) {
		jwt.verify(token, process.env.TOKEN_KEY, (err, decodedToken) => {
			if (err) {
				console.log(err);
			} else {
				console.log(decodedToken.id);
				next();
			}
		});
	} else {
		console.log('no token !');
	}
}; */
//* ******************** requireAuth end ******************** *//