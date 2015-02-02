/**
 * Created by Angus on 2015-01-20.
 */
define(
	[],
	function() {

		// Establish the group factory function
		return function(configuration) {

			// Get a reference to this
			var self = this;

			// PROPERTIES

			// An array of entries
			self.entries = [];

			// An object containing an order and a column property on
			// which the entries in the group should be sorted
			self.sorting = {
				ascending:  true,
				column:     undefined
			};

			// FUNCTIONS

			/**
			 * Returns an array of the entries that meet the given
			 * condition
			 * @returns {Array}
			 */
			self.activeEntries = function(){

				// Create a new array for active entries
				var activeEntries = [];
				var entryPool = self.entries;

				// Loop through the entries and push those the fit
				// onto the array of active entries
				for (var entryCounter = 0; entryCounter < entryPool.length; entryCounter++) {
					var entry = entryPool[entryCounter];
					if (self.condition(entry)) {
						activeEntries.push(entry);
					}
				}

				// Return the set of active entries
				return activeEntries;

			};

			/**
			 * Function that takes in an entry and determines whether
			 * or not it belongs to the given group. Note that this is
			 * designed to be replaced.
			 * @param entry
			 * @returns {boolean}
			 */
			self.condition = function(entry) {
				return true;
			};

			/**
			 * Heading for the group.
			 * Note that this is designed to have its value replaced
			 * with another function that takes in the entries as a
			 * parameter and returns a string to be displayed as a
			 * heading as a result.
			 * @returns {string}
			 */
			self.heading = function(entries){
				return 'heading';
			};

			/**
			 * Set the entries of the group preserving the reference
			 * to the passed value.
			 * @param entries
			 */
			self.setEntries = function(entries) {
				self.entries = entries;
			};

			/**
			 * Set the hading function. If the passed heading is a string
			 * then transform it into a function that returns the given
			 * string.
			 * @param heading
			 */
			self.setHeading = function(heading) {
				if (typeof heading === 'string') {
					heading = function() {return heading};
				}
				self.heading = function(){
					return heading(self.sortedActiveEntries());
				};
			};

			/**
			 * Set the sorting for the group preserving
			 * the reference to the passed value
			 * @param sorting
			 */
			self.setSorting = function(sorting) {
				self.sorting = sorting;
			};

			/**
			 * Setup the group using the given configuration
			 * @param configuration
			 */
			self.setup = function(configuration) {

			};

			/**
			 * Loop through the active entries, sort them
			 * and return them
			 * @returns {entries|*|Array}
			 */
			self.sortedActiveEntries = function() {

				// Get the active entries
				var sortedEntries = self.activeEntries();

				// Sort the entries
				sortedEntries.sort(function(a,b) {

					// Get the sort column
					var sortColumn = self.sorting.column;

					// If we don't have a proper sort column then
					// leave them in their current order.
					if (typeof self.sorting.column === 'undefined') {
						return 0;
					}

					// Get the sort value from the column
					var sortValueA = sortColumn.getSortValue(a);
					var sortValueB = sortColumn.getSortValue(b);

					// If the sort values do not match in type then
					// cast them both to strings
					if (typeof sortValueA !== typeof sortValueB) {
						sortValueA = sortValueA.toString();
						sortValueB = sortValueB.toString();
					}

					// Check the sort order
					var sortOrder = -1;
					if (self.sorting.ascending) {
						sortOrder = 1;
					}

					// Compare the values
					if (sortValueA > sortValueB) {
						return sortOrder;
					} else if (sortValueA < sortValueB) {
						return -sortOrder;
					} else {
						return 0;
					}


				});

				// Return the sorted entries
				return sortedEntries;
			};

			// Run the setup using the given configuration
			self.setup(configuration);

		};

	}
);