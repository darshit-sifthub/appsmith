export default {
	getMatchQuery() {
		// Permanent filters
		let match_query = "";

		// Add client_id filter if user input is available
		if (client_id && client_id.selectedOptionValue) {
			match_query += ` AND client_id = ${client_id.selectedOptionValue}`;
		}

		console.log("pending match_query:", match_query);
		return match_query;
	}
};
