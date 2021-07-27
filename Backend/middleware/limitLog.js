const limitLog = require('express-rate-limit');

// 5 tentatives maximum avant d'être bloqué 5 min
module.exports = limitLog({
	windowMs: 5 * 60 * 1000,
	max: 5,
	statusCode: 200,
	message: {
		status: 429,
		errorBrute:
			"Vous avez atteint le maximum d'essais, veuillez retenter dans 5 minutes !",
	},
});