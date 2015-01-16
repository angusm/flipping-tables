/**
 * Created by Angus on 2015-01-14.
 */
var flippingTables = angular.model('flippingTables', ['components']);

// CONTROLLER

// Set up the flipping tables controller
flippingTables.controller(
	'FlippingTables',
	[
		'$scope',
		function($scope) {

			// Store the groups
			$scope.groups   = {};

			// Store the data
			$scope.entries  = {};

			// Store the columns (how to separate the groups)
			$scope.columns  = [];

			$scope.addColumn = function(propertyName) {

			}

		}
	]
);

// FACTORY

// COLUMN FACTORIES

// Column Factory
flippingTables.factory('column', function() {
	return function(propertyName) {

		//PROPERTIES

		// The property name, the value to use to retrieve the information
		// from the entries
		this.propertyName = propertyName;

		// The value to use in the header to display
		this.label = propertyName;

		// Store the conversion information
		this.displayFilters = [];

		// FUNCTIONS

		/**
		 * Convert the value to a display
		 * @param value
		 * @returns {*}
		 */
		this.displayValue = function(value) {

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
flippingTables.factory('ColumnFilter', function() {
	return function() {
		this.convert = function(data) {
			return data;
		};
	};
});

// Currency filter factory
flippingTables.factory('currencyFilter', function() {

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
flippingTables.factory('decimalFilter', function(decimalPlaces) {

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
