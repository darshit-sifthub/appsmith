export default {
	getMatchQuery() {
		// Permanent filters
		let match_query = "";

		// Add client_id filter if user input is available
		if (client_id && client_id.selectedOptionValue) {
			match_query += ` AND puam.client_id = ${client_id.selectedOptionValue}`;
		}

		if (user_id && user_id.selectedOptionValue) {
			match_query += ` AND puam.user_id = ${user_id.selectedOptionValue}`;
		}

		console.log("User match_query:", match_query);
		return match_query;
	}
};
