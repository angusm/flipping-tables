/**
 * Created by Angus on 2015-01-20.
 */
define(
	[
		// Controllers
		'flipping-tables/controllers/flipping-table-controller'
	],
	function(
		// Controller
		flippingTableController
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
				},
				templateUrl:'../templates/flipping-table.html'
			};
		};
	}
);