export default {
	// Fetch client mapping data from DB & return client names based on client id
	// Define an empty object to store client mapping initially
	clientMapping: [],

	// Function to run the MySQL query and fetch data
	async fetchClientMapping() {
		try {
			// Execute the MySQL query and store the result in clientMapping
			const result = await client_mapping_qry.run();
			this.clientMapping = result;  // Assign the result to the clientMapping variable
			// Log the result to the console for debugging
			// console.log('Fetched clientMapping:', this.clientMapping);
			return result;
		} catch (error) {
			// Handle any errors that may occur during the query execution
			console.error('Error fetching clientMapping:', error);
		}
	},

	getClientMapping(client_id) {
		// console.log('client', this.clientMapping);
		const client = this.clientMapping.filter((_client) => _client.id == client_id);
		return client?.[0]?.name || 'Unknown';  // Return the variable value
	}
}