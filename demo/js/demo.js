/**
 * Created by Angus on 2015-01-20.
 */

/**
 * Establish the configuration for require
 */
requirejs.config({
	baseUrl: 'js/',
	paths: {
		'flipping-tables':  '.. /../js/flipping-tables'
	}
});

/**
 * Load everything important
 */
requirejs(
	['flipping-tables/main'],
	function(ft) {

	}
);