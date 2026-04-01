export default {
	getMatchQuery() {
		console.log('invoking with params');

		let match_query = {
			created_at: {
				$gte: new Date(start_date.selectedDate).getTime(),
				$lte: new Date(end_date.selectedDate).getTime(),
			},
			source: {$in: ["INTERNAL_GENERATE"] }
		};

		if (client_id && client_id?.selectedOptionValue) {
			match_query.client_id = client_id.selectedOptionValue;
		}
		// 
		if (user_id && user_id?.selectedOptionValue) {
			match_query.created_by = user_id.selectedOptionValue;
		}



		// if (generateSource && generateSource?.value) {
		// match_query.generateSource = generateSource.value;
		// }

		console.log('AI Teammate match_query:', match_query);

		return match_query;
	}
};