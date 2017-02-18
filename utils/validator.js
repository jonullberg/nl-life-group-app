'use strict';

module.exports = {
	validateNoDuplicateIds: function(list, id) {
		return list.indexOf(id) === -1;
	}
}