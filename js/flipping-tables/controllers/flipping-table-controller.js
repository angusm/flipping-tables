/**
 * Created by Angus on 2015-01-21.
 */
define(
	[
		'flipping-tables/functions/defaultValue',
		'flipping-tables/factories/columnFactory',
		'flipping-tables/factories/groupFactory'
	],
	function (
		defaultValue,
	    Column,
	    Group
	) {

		return function() {

			var self = this;

			// PROPERTIES
			this.columns = [];
			this.entries = [];
			this.groups = [];

			// FUNCTIONS

			/**
			 * Add a column to the table for the given property name
			 * and the filters on the property name
			 * @param column
			 */
			this.addColumn = function(column) {

				// Establish the values
				var filters         = defaultValue(column.filters,[]);
				var propertyName    = column.propertyName;

				// Create a new column
				var newColumn = Column(propertyName);

				// Add the given filters to the column
				for (var filterCounter = 0; filterCounter < filters.length; filters++) {
					newColumn.addFilter(filters[filterCounter]);
				}

				// Add the column to the array
				this.columns.push(newColumn);

			};

			/**
			 * Loop through the given columns and add each one
			 * @param columns
			 */
			this.addColumns = function(columns) {
				for (var columnCounter = 0; columnCounter < columns.length; columnCounter++) {
					this.addColumn(columns[columnCounter]);
				}
			};

			this.addGroup = function(group) {

			};

			/**
			 * Set the entries to the given parameter
			 * @param entries
			 */
			this.setEntries = function(entries) {
				this.entries = entries;
			}

		};

	}
);