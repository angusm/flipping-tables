/**
 * Created by Angus on 2015-01-20.
 */

/**
 * Establish the configuration for require
 */
requirejs.config({
	baseUrl: 'js/',
	paths: {
		'flipping-tables':  '../../js/flipping-tables'
	}
});

/**
 * Load everything important
 */
requirejs(
	[
		'flipping-tables/external-libraries/angularWrapper',
		'flipping-tables/external-libraries/jqueryWrapper',
		'flipping-tables/main',
		'domReady!'
	],
	function(
		angular,
		jQuery,
		ft
	) {

		window.jQuery = jQuery;
		window.ft = ft;

		// Create the module we'll be using for our demo
		var demoModule = ft.createFTModule('Demo');

		// Create our controller for our demo module
		demoModule.controller(
			'DemoController',
			[
				'$scope',
				function($scope) {

					// Setup a place holder for the table data
					$scope.tableData = undefined;

					// Add a watcher to it, setting it when it is
					// no longer null.
					$scope.$watch('tableData', function(){

						if (typeof $scope.tableData !== 'undefined') {

							// Establish the columns as variables
							var nameCol = new ft.Models.Column({
								columnValue:    'colorName',
								label:          'Color Name'
							});
							var hexCol = new ft.Models.Column({
								columnValue:    'hexValue',
								label:          'Hex Value'
							});
							var redCol = new ft.Models.Column({
								columnValue:    'red',
								label:          'Red'
							});
							var greenCol = new ft.Models.Column({
								columnValue:    'green',
								label:          'Green'
							});
							var blueCol = new ft.Models.Column({
								columnValue:    'blue',
								label:          'Blue'
							});

							// Set the columns
							$scope.tableData.setColumns([
								nameCol,
								hexCol,
								redCol,
								greenCol,
								blueCol
							]);

							// Set the default sort column
							$scope.tableData.setSortColumn(
								nameCol
							);

							// Add a couple of groups
							$scope.tableData.groupBy(
								function(entry) {
									return entry.colorName[0];
								},
								function(entries) {
									return 'First Letter: ' + entries[0].colorName[0];
								}
							);

							// Set the entries
							$scope.tableData.setEntries([
								{
									colorName:"red",
									hexValue:"#f00",
									red: 'f',
									green: '0',
									blue: '0'
								},{
									colorName:"green",
									hexValue:"#0f0",
									red: '0',
									green: 'f',
									blue: '0'
								},{
									colorName:"blue",
									hexValue:"#00f",
									red: '0',
									green: '0',
									blue: 'f'
								},{
									colorName:"cyan",
									hexValue:"#0ff",
									red: '0',
									green: 'f',
									blue: 'f'
								},{
									colorName:"magenta",
									hexValue:"#f0f",
									red: 'f',
									green: '0',
									blue: 'f'
								},{
									colorName:"yellow",
									hexValue:"#ff0",
									red: 'f',
									green: 'f',
									blue: '0'
								},{
									colorName:"black",
									hexValue:"#000",
									red: '0',
									green: '0',
									blue: '0'
								}
							]);
						}
					});

				}
			]
		);

		// Bootstrap to the body
		angular.bootstrap(document.getElementsByTagName('body'),['Demo']);

	}
);