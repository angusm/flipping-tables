/**
 * Created by Angus on 2015-01-20.
 */
define(
	[],
	function() {

		// Return the directive
		return function() {
			return {
				restrict:       'E',
				controller:     'FlippingTables',
				controllerAs:   'tableData',
				link: function(
					scope,
					element,
					attrs,
					controllers
				) {
					// Grab the table data from the scope
					var tableData = scope.tableData;

					// Grab the information from the data for the
					// entries, columns and groups
					tableData.setEntries(
						$(element).data('entries')
					);
					tableData.addColumns(
						$(element).data('columns')
					);
					tableData.addGroup();
					tableData.addGroup();
				},
				templateUrl:'flipping-table.html'
			};
		}
	}
);