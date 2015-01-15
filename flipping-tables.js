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

		// The property name, the value to use to retrieve the information
		// from the entries
		this.propertyName = propertyName;

		// The value to use in the header to display
		this.label = propertyName;

		// Store the conversion information
		this.displayFilters = {};

	};
});

// Column Filter Factory
flippingTables.factory('column', function() {
	return function() {

	};
});