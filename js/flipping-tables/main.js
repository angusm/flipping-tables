/**
 * Created by Angus on 2015-01-20.
 */
define(
	[
		// Controllers
		'flipping-tables/controllers/flipping-table-controller',

		// Directives
		'flipping-tables/directives/flipping-table-directive',

		// Externals
		'flipping-tables/external-libraries/angularWrapper',

		// Factories
		'flipping-tables/factories/columnFactory',
		'flipping-tables/factories/groupFactory',

		// Functions

		//Modules
		'flipping-tables/modules/flipping-table'
	],
	function(

		// Controllers,
		ftController,

		// Directives
		ftDirective,

		// Externals
	    angular,

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

		// Set up the

		return ftModule;
	}
);