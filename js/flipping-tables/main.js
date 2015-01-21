/**
 * Created by Angus on 2015-01-20.
 */
define(
	[
		// Controllers

		// Directives
		'flipping-tables/directives/flipping-table-directive',

		// Factories

		// Functions

		// Externals

	],
	function(
		ftDirective
	) {

		// Establish the module
		var flippingTablesModule = angular.module('FlippingTable',[]);

		// Set up the directives

		// The flipping table directive
		flippingTablesModule.directive('flippingTable', ftDirective);

		return flippingTablesModule;
	}
);