/**
 * Created by Angus on 2015-01-20.
 */
define(
	[
		'flipping-tables/models/filters/decimalFilter'
	],
	function(decimalFilter) {

		// Return the currency filter function
		return function (value) {
			return '$' + decimalFilter(value,2);
		}

	}
);
