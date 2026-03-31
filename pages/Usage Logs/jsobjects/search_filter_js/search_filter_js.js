export default {
	getMatchQuery() {
		console.log('invoking with params');

		let match_query = {
			created: {
				$gte: start_date.selectedDate,
				$lte: end_date.selectedDate
			},
			searchSource :"SEARCH_REQUEST",
		};

		if (client_id && client_id?.selectedOptionValue) {
			match_query.clientId = client_id.selectedOptionValue;
		}

		if (user_id && user_id?.selectedOptionValue) {
			match_query.userId = user_id.selectedOptionValue;
		}

		console.log('Generated match_query:', match_query);

		return match_query;
	}
};
