/**
 * Created by Angus on 2015-01-20.
 */
define(
	[],
	function() {

		// Establish the column factory function
		return function() {
			return function (propertyName) {

				//PROPERTIES

				// The property name, the value to use to retrieve the
				// information from the entries
				this.propertyName = propertyName;

				// The value to use in the header to display
				this.label = propertyName;

				// Store the conversion information
				this.displayFilters = [];

				// FUNCTIONS

				/**
				 * Add the given filter to the column's display filters
				 * @param filter
				 */
				this.addFilter = function (filter) {
					this.displayFilters.push(filter);
				};

				/**
				 * Convert the value to a display
				 * @param entry
				 * @returns {*}
				 */
				this.displayValue = function (entry) {

					var value = entry[this.propertyName];

					// Change the value through the filters and return the result
					$.each(
						this.displayFilters,
						function (index, filter) {
							value = filter.convert(value);
						}
					);
					return value;

				};

			};
		}
	}
);