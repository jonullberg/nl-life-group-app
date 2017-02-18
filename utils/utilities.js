'use strict';

module.exports = {
	logError: function logError(msg, err, res) {
		console.log(msg, err);
		return res.status(500).json({
			'msg': 'Internal Server Error'
		});
	}
}