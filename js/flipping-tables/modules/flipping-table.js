/**
 * Created by Angus on 2015-01-25.
 */
define(
	[
		// Constants
		'flipping-tables/constants/general',

		// Externals
		'flipping-tables/external-libraries/angularWrapper'
	],
	function(
		// Constants
		constants,

		// Externals
		angular
	) {

		// Create the module if it doesn't exist using a try/catch
		try {
			return angular.module(constants.moduleName);
		} catch(e) {
			return angular.module(constants.moduleName,[]);
		}
	}
);