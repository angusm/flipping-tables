/**
* Created by Angus on 2015-01-14.
*/

// Set up the module
flippingTables = angular.module('flippingTables',[]);

// DIRECTIVES
flippingTables.directive('flippingTable', function(){
	return {
		restrict:       'E',
		controller:     'FlippingTables',
		controllerAs:   'tableData',
		link: function(
			scope,
			element,
			attrs,
			controllers
		) {

			// Grab the table data from the scope
			var tableData = scope.tableData;

			// Grab the information from the data for the
			// entries, columns and groups
			tableData.setEntries(
				$(element).data('entries')
			);
			tableData.addColumns(
				$(element).data('columns')
			);
			tableData.addGroup();
			tableData.addGroup();
		},
		templateUrl:'flipping-table.html'
	};
});

// FACTORY

// Group Factories
// ------------------------------------------------------------------------------------------------------------
flippingTables.factory('GroupFactory', function() {
	return function(
		heading,
	    entries
	) {

	};
});

// Column Factories
// ------------------------------------------------------------------------------------------------------------

// Column Factory
flippingTables.factory('ColumnFactory', function() {
	return function(propertyName) {

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
		this.addFilter = function(filter) {
			this.displayFilters.push(filter);
		};

		/**
		 * Convert the value to a display
		 * @param entry
		 * @returns {*}
		 */
		this.displayValue = function(entry) {

			var value = entry[this.propertyName];

			// Change the value through the filters and return the result
			$.each(
				this.displayFilters,
				function(index,filter) {
					value = filter.convert(value);
				}
			);
			return value;

		};

	};
});

// Column Filter Factories
// ------------------------------------------------------------------------------------------------------------

// Generic filter, does nothing, designed to be extended
flippingTables.factory('ColumnFilterFactory', function() {
	return function() {
		this.convert = function(data) {
			return data;
		};
	};
});

// Currency filter factory
flippingTables.factory('CurrencyFilterFactory', function() {

	// Use the generic column filter and adjust it
	var currencyFilter  = new DecimalFilterFactory(2);
	currencyFilter.convert = function(data) {
		var conversion = new DecimalFilterFactory(conversion.decimalPlaces).convert(data);
		conversion = '$' + conversion;
		return conversion;
	};
	return currencyFilter;
});

// Decimal filter factory
flippingTables.factory('DecimalFilterFactory', function(decimalPlaces) {

	// Use the generic column filter and adjust it
	var decimalFilter  = new ColumnFilterFactory();

	// Add the decimal places
	decimalFilter.prototype.decimalPlaces = decimalPlaces;

	// Adjust the convert function
	decimalFilter.convert = function(data) {
		var conversion = new ColumnFilterFactory().convert(data);
		if ($.isNumeric(data)) {
			conversion = parseFloat(conversion);
			conversion = conversion.toFixed(this.decimalPlaces);
		}
		return conversion;
	};

	// Return the result
	return decimalFilter;

});

// CONTROLLER

// Set up the flipping tables controller
flippingTables.controller(
	'FlippingTables',
	[
		'ColumnFactory',
		function(ColumnFactory) {

			var _this = this;

			// PROPERTIES
			this.anger = 'anger2';

			// Store the groups, entries and columns
			this.columns  = [];
			this.entries  = [];
			this.groups   = [];

			// FUNCTIONS

			/**
			 * Add a column to the table for the given property name
			 * and the filters on the property name
			 * @param column
			 */
			this.addColumn = function(column) {

				// Establish the values
				var propertyName = column.propertyName;
				var filters = defaultValue(column.filters,[]);

				// Create a new column
				var newColumn = new ColumnFactory(propertyName);

				// Add the given filters to the column
				$.each(
					filters,
					function(index,filter) {
						newColumn.addFilter(filter);
					}
				);

				// Add the column to the array
				this.columns.push(
					newColumn
				);
			};

			/**
			 * Add a set of columns to the table for the given property name
			 * and the corresponding filters
			 * @param columns
			 */
			this.addColumns = function(columns) {

				// Loop through each column and add it
				$.each(
					columns,
					function(index,column) {
						_this.addColumn(column);
					}
				);

			};

			/**
			 * Add a group with the given condition and heading function
			 * @param conditionFunction
			 * @param headingFunction
			 */
			this.addGroup = function(conditionFunction, headingFunction) {

				// Handle default values for the heading and condition function
				conditionFunction = defaultValue(
					conditionFunction,
					function(entry){return true}
				);
				headingFunction = defaultValue(
					headingFunction,
					function(){return 'Group';}
				);

				// Loop through all of the data entries, adding those that return
				// true after being passed to the condition function to the set of
				// entries for the group.
				var newGroupEntries = [];
				$.each(
					this.entries,
					function(index, entry) {
						if (conditionFunction(entry)) {
							newGroupEntries.push(entry);
						}
					}
				);

				// Create the group
				this.groups.push(
					{
						heading: headingFunction,
						entries: newGroupEntries
					}
				);

			};

			/**
			 * Set the entries to the given value
			 * @param entries
			 */
			this.setEntries = function(entries) {
				this.entries = entries;
			}

		}
	]
);

// UTILITY FUNCTIONS:

/**
 * Used to assign a default value to a parameter in a readable way
 * @param parameter
 * @param defaultValue
 * @returns {*}
 */
function defaultValue (parameter, defaultValue) {
	var result = parameter;
	if ('undefined' === typeof parameter) {
		result = defaultValue;
	}
	return result;
}