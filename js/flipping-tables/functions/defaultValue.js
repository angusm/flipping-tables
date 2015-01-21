/**
 * Created by Angus on 2015-01-20.
 */

/**
 * Used to assign a default value to a parameter in a readable way
 * @param parameter
 * @param defaultValue
 * @returns {*}
 */
define(
	[],
	function() {

		return function(parameter, defaultValue) {
			var result = parameter;
			if ('undefined' === typeof parameter) {
				result = defaultValue;
			}
			return result;
		};
	}
);