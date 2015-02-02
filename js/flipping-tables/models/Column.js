/**
 * Created by Angus on 2015-01-20.
 */
define(
	[
		// External libraries
		'flipping-tables/external-libraries/jqueryWrapper',

		// Functions
		'flipping-tables/functions/defaultValue',
		'flipping-tables/functions/getPropertyByString'
	],
	function(
		// External Libraries
		jQuery,

		// Functions
	    defaultValue,
	    getPropertyByString
	) {

		// Establish the column factory function
		return function (configuration) {

			// Rock the self
			var self = this;

			//PROPERTIES

			// The function to return the initial value for the column before
			// the filters are applied
			self.columnValue = function(entry){return '';};

			// The value to use in the header to display
			self.label = '';

			// Store the conversion information
			self.displayFilters = [];
			self.sortFilters    = [];

			// FUNCTIONS

			/**
			 * Add the given filter to the column's display filters
			 * @param filter
			 */
			self.addFilter = function (filter) {
				self.displayFilters.push(filter);
			};

			/**
			 * Filter the column value of the entry using the given filters
			 * @param entry
			 * @param filters
			 * @returns {*}
			 */
			self.filter = function (entry,filters) {

				// Establish a filtered value
				var filteredValue = self.columnValue(entry);

				// Change the value through the filters and return the result
				for (var filterCounter = 0; filterCounter < filters.length; filterCounter++) {

					// Get the filter and apply it
					var filter = filters[filterCounter];
					filteredValue = filter.convert(filteredValue);
				}

				return filteredValue;

			};

			/**
			 * Get the display value for the given entry
			 * @param entry
			 * @returns {*}
			 */
			self.getDisplayValue = function (entry) {
				// Run the display filters on the entry's column value
				return self.filter(entry,self.displayFilters);
			};

			/**
			 * Get the sort value for the given entry
			 * @param entry
			 * @returns {*}
			 */
			self.getSortValue = function (entry) {
				// Run the sort filters on the entry's column value
				var sortValue = self.filter(entry,self.sortFilters);

				// If the value is numeric then parse it to a float
				if (jQuery.isNumeric(sortValue)) {
					return parseFloat(sortValue);

				// Otherwise up case it
				} else {
					return sortValue.toUpperCase();
				}

			};

			/**
			 * Set the display filters to the given value
			 * @param filters
			 */
			self.setDisplayFilters = function(filters) {
				self.setFilters(self.displayFilters,filters);
			};

			/**
			 * Set the given filters variable to contain the given
			 * filter values.
			 * @param filtersVariable
			 * @param filterValues
			 */
			self.setFilters = function(filtersVariable,filterValues) {

				// In order to ensure angular can keep track of the changes
				// we remove the values one by one and then push on the new
				// values
				while (filtersVariable.length > 0) {
					filtersVariable.pop();
				}
				while (filterValues.length > 0) {
					filtersVariable.push(filterValues.pop());
				}

			};

			/**
			 * Set the sort filters to the given value
			 * @param filters
			 */
			self.setSortFilters = function(filters) {
				self.setFilters(self.sortFilters,filters);
			};

			/**
			 * Setup the column using the given configuration
			 * @param configuration
			 */
			self.setup = function(configuration) {

				// Establish the column value
				if (typeof configuration.columnValue === 'string') {
					self.columnValue = function(entry) {
						return getPropertyByString(entry, configuration.columnValue);
					}
				} else if (typeof configuration.columnValue === 'function') {
					self.columnValue = configuration.columnValue;
				}

				// The value to use in the header to display
				if (typeof configuration.label === 'string') {
					self.label = configuration.label;
				}

				// If we have filters that we can set then do so
				if (jQuery.isArray(configuration.displayFilters)) {
					self.setDisplayFilters(configuration.displayFilters);
				}
				if (jQuery.isArray(configuration.sortFilters)) {
					self.setSortFilters(configuration.sortFilters);
				}

			};

			/**
			 * Setup the column
			 */
			self.setup(configuration);

		};
	}
);