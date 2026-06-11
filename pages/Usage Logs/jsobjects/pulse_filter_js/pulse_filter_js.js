export default {
	getMatchQuery() {
		console.log('invoking with params');

		let match_query = {
			deleted: false,
			active: true,
			usage_log_ready: true,
			"calendar_meta.start_time": { $gte: new Date(start_date.selectedDate).getTime(), $lte: new Date(end_date.selectedDate).getTime() }
		};

		if (client_id && client_id?.selectedOptionValue) {
			match_query.client_id = client_id.selectedOptionValue;
		}

		// if (generateSource && generateSource?.value) {
		// match_query.generateSource = generateSource.value;
		// } else {
		// match_query.generateSource = {
		// $in: ['SLACK_GENERATE', 'MICROSOFT_TEAMS_GENERATE', 'GOOGLE_CHAT_GENERATE', 'AUTOFILL_GENERATE', 'ANSWER_GENERATE']
		// }
		// }

		console.log('Pulse match_query:', match_query);

		return match_query;
	}
};
