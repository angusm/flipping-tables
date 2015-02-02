/**
 * Created by Angus on 2015-02-01.
 */

/**
 * Function to return all of the distinct return values of a
 * given function operating on the values in a given array
 */
define(
	[],
	function() {

		/**
		 * Takes a given function and operates it on the given values and
		 * returns an array of the distinct results
		 * @param func
		 * @param values
		 * @returns {Array}
		 */
		return function (func, values) {

			// Setup a variable to contain the distinct results and another
			// to contain the JSON string of the results
			var distinctValues = [];
			var distinctValuesJSON = [];

			// Build the array of distinct values
			for (var valueCounter = 0; valueCounter < values.length; valueCounter++) {

				// Get the value and the result
				var value = values[valueCounter];
				var result = func(value);

				// Get the result as a JSON string. We will use this string to
				// determine if the result is distinct
				var resultJSON = JSON.stringify(result);

				// If the result is distinct then we add it to our distinct values
				if (distinctValuesJSON.indexOf(resultJSON) === -1) {
					distinctValues.push(result);
					distinctValuesJSON.push(resultJSON);
				}
			}

			// Now that we've gone through all of our values we return the distinct results
			return distinctValues;

		};
	}
);