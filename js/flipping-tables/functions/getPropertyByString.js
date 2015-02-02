/**
 * Created by Angus on 2015-01-20.
 */

/**
 * Function to get the property of a given object by a period delimited string
 */
define(
	[],
	function() {

		/**
		 * Loops through the properties of a desired object returning the property
		 * as indicated by the given period delimited string provided it exists.
		 * Will return undefined otherwise.
		 * @param object    {object}
		 * @param property  {string}
		 * @returns         {*}
		 */
		return function(object,property) {

			// Split the property
			var properties = property.split('.');

			// Start looping through the properties, establishing an intermediate value
			var intermediateValue = object;
			for (var propertyCounter = 0; propertyCounter < properties.length; propertyCounter++) {

				var desiredProperty = properties[propertyCounter];

				// Check if the desired property exists
				// If it doesn't then none of the subsequent properties will be defined
				// so we can just return undefined
				if (typeof intermediateValue[desiredProperty] !== 'undefined') {
					intermediateValue = intermediateValue[desiredProperty];
				} else {
					return undefined;
				}

			}

			// Now we can return the final property
			return intermediateValue;

		};
	}
);