/**
 * Created by Angus on 2015-01-20.
 */
define(
	[],
	function() {

		// Establish the group factory function
		return function(parameters) {

			// Get a reference to this
			var self = this;

			// Properties
			self.activeEntries          = [];
			self.sortedActiveEntries    = [
				{},{},{},{},{},{},{}
			];

			// FUNCTIONS

			/**
			 * Heading for the group
			 * @returns {string}
			 */
			self.heading = function(){
				return 'heading';
			}

		};

	}
);