/**
 *
 * @param {String} date Date string returned by backend (format: YYYY-MM-DD hh:mm:ss Z offset)
 * returns date string in MM/DD/YYYY format
 */
export function getDateMMDDYYYY(date) {
	var monthNames = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec'
	];

	var day = date.slice(8, 10);
	var monthIndex = parseInt(date.slice(5, 7)) - 1;
	var year = date.slice(0, 4);

	return day + '/' + monthNames[monthIndex] + '/' + year;
}

export function validateEmail(email) {
	if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
		return true;
	}
	return false;
}

/**
 * Function to sort dropdown.
 * @param {object} a input value.
 * @param {object} b input value.
 **/
export function sortDropdown(a, b) {
	if (a.name < b.name) {
		return -1;
	} else if (b.name < a.name) {
		return 1;
	}
	return 0;
}

/**
 * Function to sort based on order.
 * @param {object} a input value.
 * @param {object} b input value.
 **/
export function sortByOrder(a, b) {
	return a.order - b.order;
}