/**
 * Created by Angus on 2015-01-20.
 */

/**
 * Return the first parameter that is not defined
 * @param parameter
 * @param defaultValue
 * @returns {*}
 */
define(
	[],
	function() {

		// Loop through the parameters and return the first one
		// that is not undefined
		return function() {

			// Loop through the args
			for (var argCounter = 0; argCounter < arguments.length; argCounter++) {
				if (typeof arguments[argCounter] !== 'undefined') {
					return arguments[argCounter];
				}
			}

			// If a defined argument couldn't be found, return undefined
			return undefined;

		};
	}
);