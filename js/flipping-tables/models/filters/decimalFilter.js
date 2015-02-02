/**
 * Created by Angus on 2015-01-20.
 */
define(
	[
		'flipping-tables/models/filters/columnFilter',
		'flipping-tables/external-libraries/jqueryWrapper'
	],
	function(
		columnFilter,
	    jQuery
	) {

		// Return the decimal filter function
		return function(value,decimalPlaces) {

			// Call the base
			var nuValue = columnFilter(value);

			// If the value is a number, round it to the decimal places
			if (jQuery.isNumeric(nuValue)) {
				nuValue = parseFloat(nuValue);
				nuValue = Math.round(nuValue * 100) / 100;
				nuValue = nuValue.toFixed(decimalPlaces);
			}
			return nuValue;
		}

	}
);
