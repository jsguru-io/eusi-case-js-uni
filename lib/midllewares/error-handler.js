const env = process.env.NODE_ENV || 'development';


module.exports = (err, req, res, next) => {
	if (err.status === 401) {
		res.clearCookie('auth_token');
	}

	res.status(err.status).json({
		message: err.message,
		status: err.status,
		validation: err.validation,
		url: req.originalUrl,
		stack: env !== 'production' ? err.stack : undefined
	});
	next(err);
};
