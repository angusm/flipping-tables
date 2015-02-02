/**
 * Created by Angus on 2015-01-21.
 */
define(
	[
		// Functions
		'flipping-tables/functions/defaultValue',
		'flipping-tables/functions/getDistinctReturnValues',
		'flipping-tables/functions/getPropertyByString',

		// Models
		'flipping-tables/models/Column',
		'flipping-tables/models/Group'
	],
	function (

		// Functions
		defaultValue,
		getDistinctReturnValues,
		getPropertyByString,

		// Models
	    Column,
	    Group
	) {

		return function ($scope) {

			var self = this;

			// PROPERTIES
			self.columns = [];
			self.entries = [];
			self.groups = [];

			// An object containing the grouping and heading function
			// used when group by is called
			self.grouping = {
				grouping: undefined,
				heading: undefined
			};

			// The following property contains the sorting object
			// it contains a column and an ascending property indicating
			// the column on which entries should be sorted within their
			// groups and the order in which those entries should be sorted
			self.sorting = {
				ascending: true,
				column: undefined
			};

			// PUBLIC FUNCTIONS

			/**
			 * Add a column to the table
			 * @param column
			 */
			self.addColumn = function(column) {

				// Add the column to the array
				self.columns.push(column);

			};

			/**
			 * Loop through the given columns and add each one
			 * @param columns
			 */
			self.addColumns = function(columns) {
				for (var columnCounter = 0; columnCounter < columns.length; columnCounter++) {
					self.addColumn(columns[columnCounter]);
				}
			};

			/**
			 * Take the given group and add it to the group set
			 * @param group
			 */
			self.addGroup = function(group) {

				// Ensure that the group has the correct entries and sorting
				// tying it to the entries and sorting of the table
				group.setEntries(self.entries);
				group.setSorting(self.sorting);
				self.groups.push(group);

			};

			/**
			 * Group the data in the table by a given property or the results of
			 * passing entries through a given function. An optional header
			 * function may be included as well.
			 * @param grouping
			 * @param heading
			 */
			self.groupBy = function (grouping, heading) {

				// If the given grouping is a string then we treat it as
				// a string indicating a property to sort on and create a
				// new function.
				if (typeof grouping === 'string') {
					var groupingProperty = grouping;
					grouping = function (entry) {
						return getPropertyByString(entry, groupingProperty);
					}
				}

				// Store the grouping and heading
				self.grouping.grouping = grouping;
				self.grouping.heading = heading;

				// Now we must get all of the distinct values
				var distinctValues = getDistinctReturnValues(grouping, self.entries);

				// Clear the groups
				self.groups = [];

				// Loop through the distinct values and create a group for each one
				for (var groupCounter = 0; groupCounter < distinctValues.length; groupCounter++) {

					// Get the distinct value
					var distinctValue = distinctValues[groupCounter];
					var groupToAdd = new Group();

					// Get the condition for the new group
					groupToAdd.condition = (function (distinctValue, groupingFunction) {
						return function (entry) {
							return distinctValue === groupingFunction(entry);
						}
					})(distinctValue, grouping);

					// Set the heading
					groupToAdd.setHeading(heading);

					// Add the group to the set of groups
					self.addGroup(groupToAdd);

				}

			};

			/**
			 * Set the columns using the given array of columns
			 * @param columns
			 */
			self.setColumns = function (columns) {
				self.columns = columns;
			};

			/**
			 * Set the entries to the given parameter
			 * @param entries
			 */
			self.setEntries = function (entries) {

				// In order to ensure that the entries passed to the groups
				// is kept in line with the entries as they are stored here
				// we need to remove and add without destroying the reference
				// in the entries variable.

				// We first remove all of the entries
				while (self.entries.length > 0) {
					self.entries.pop();
				}
				while (entries.length > 0) {
					self.entries.push(entries.pop());
				}
			};

			/**
			 * Change the value of the groups, adding the new groups one at
			 * a time so they can be set with the proper entries and sorting
			 * @param groups
			 */
			self.setGroups = function(groups) {
				self.groups = [];
				for (var groupCounter = 0; groupCounter < groups.length; groupCounter++) {
					var groupToAdd = groups[groupCounter];
					self.addGroup(groupToAdd);
				}
			};

			/**
			 * Set the sorting column to the given column
			 * An ascending value may also be included
			 * @param sortColumn
			 * @param ascending
			 */
			self.setSortColumn = function (sortColumn, ascending) {
				self.sorting.column = sortColumn;
				if (typeof ascending === 'boolean') {
					self.sorting.ascending = ascending;
				}
			};

			/**
			 * Change the sort on the table to be ascending
			 */
			self.sortAscending = function () {
				self.sorting.ascending = true;
			};

			/**
			 * Change the sort on the table to be descending
			 */
			self.sortDescending = function () {
				self.sorting.ascending = false;
			};

			// PRIVATE FUNCTIONS

			// WATCHER

			/**
			 * Add a watcher to check for changes in the entries and adjust
			 * the grouping to match in case new entries have been added that
			 * should trigger the creation of new groups
			 */
			$scope.$watch(
				function(){
					return self.entries;
				},
				function(){
					if (typeof self.grouping.grouping === 'undefined') {
						return;
					}
					self.groupBy(
						self.grouping.grouping,
						self.grouping.heading
					);
				}
			)

		};
	}
);