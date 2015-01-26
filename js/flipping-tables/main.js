/**
 * Created by Angus on 2015-01-20.
 */
define(
	[
		// Controllers
		'flipping-tables/controllers/flipping-table-controller',

		// Directives
		'flipping-tables/directives/flipping-table-directive',

		// Factories
		'flipping-tables/factories/columnFactory',
		'flipping-tables/factories/groupFactory',

		//Modules
		'flipping-tables/modules/flipping-table'
	],
	function(

		// Controllers,
		ftController,

		// Directives
		ftDirective,

		// Factories
		columnFactory,
		groupFactory,

		// Modules
		ftModule
	) {

		// Setup the factories
		ftModule.factory('ColumnFactory',columnFactory);
		ftModule.factory('GroupFactory',groupFactory);

		// Setup the controllers
		ftModule.controller(
			'FlippingTables',
			[
				ftController
			]
		);

		// Set up the directives
		ftModule.directive('flippingTable', ftDirective);

		// Return the module
		return ftModule;
	}
);