/**
 * Created by Angus on 2015-01-20.
 */
define(
	[

		// Directives
		'flipping-tables/directives/flipping-table-directive',

		// Externals
		'flipping-tables/external-libraries/angularWrapper',

		// Factories
		'flipping-tables/models/Column',
		'flipping-tables/models/Group',

		// Functions
		'flipping-tables/functions/defaultValue'

	],
	function(

		// Directives
		ftDirective,

		// Externals
		angular,

		// Factories
		columnFactory,
		groupFactory,

		// Functions
		defaultValue

	) {

		/**
		 * Return a function that can be run on a module. This will attach the table directive and factories
		 * to the module.
		 */
		return {

			/**
			 * Function to create a module with the given name with (or attach to a module with the given name)
			 * all of the functionality necessary for a flipping table
			 * @param moduleName
			 * @param moduleParams
			 */
			createFTModule: function(moduleName,moduleParams){

				// Default the module params to an empty array
				moduleParams = defaultValue(moduleParams,[]);

				// Get the module
				var module;
				try {
					module = angular.module(moduleName);
				} catch(e) {
					module = angular.module(moduleName,moduleParams);
				}

				// Setup the factories
				module.factory('ColumnFactory', columnFactory);
				module.factory('GroupFactory', groupFactory);

				// Set up the directives
				module.directive('flippingTable', ftDirective);

				// Return the module
				return module;

			},

			Models: {
				Column: columnFactory,
				Group: groupFactory
			}

		};

	}
);