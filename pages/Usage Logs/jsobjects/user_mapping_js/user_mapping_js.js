export default {
	// Define an empty array to store user mapping initially
	userMapping: [],

	// Function to run the MySQL query and fetch data
	async fetchuserMapping() {
		try {
			// Execute the MySQL query and store the result in userMapping
			const result = await user_mapping_qry.run();
			this.userMapping = result;  // Assign the result to the userMapping variable
			// Log the result to the console for debugging
			// console.log('Fetched userMapping:', this.userMapping);
			return result;
		} catch (error) {
			// Handle any errors that may occur during the query execution
			console.error('Error fetching userMapping:', error);
		}
	},

	getuserMapping(user_id) {
		const user = this.userMapping.filter((_user) => _user.user_id === user_id);
		return user?.[0]?.username || 'Unknown';  // Return the variable value
	}
}
