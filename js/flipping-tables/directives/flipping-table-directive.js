/**
 * Created by Angus on 2015-01-20.
 */
define(
	[
		// Controllers
		'flipping-tables/controllers/flipping-table-controller',

		// External Libraries
		'flipping-tables/external-libraries/jqueryWrapper'
	],
	function(
		// Controller
		flippingTableController,

		// External Libraries
		jQuery
	) {

		// Return the directive
		return function() {
			return {
				restrict:       'E',
				controller:     flippingTableController,
				controllerAs:   'tableData',
				link: function(
					scope,
					element,
					attrs,
					controllers
				) {
					// Grab the table data from the scope
					window.tableData = scope.tableData;
				},
				templateUrl:'../templates/flipping-table.html'
			};
		};
	}
);