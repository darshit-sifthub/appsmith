export default {
	getMatchQuery() {
		// Define optional match conditions based on filter values
		const matchConditions = [
			{ createdAt: { $gte: new Date(start_date.selectedDate).getTime(), $lte: new Date(end_date.selectedDate).getTime() } }
		];

		// Add user_id, clientId, and generateSource conditions if they are specified
		if (user_id && user_id.selectedOptionValue) {
			matchConditions.push({ userId: user_id.selectedOptionValue });
		}
		if (client_id && client_id.selectedOptionValue) {
			matchConditions.push({ clientId: client_id.selectedOptionValue });
		}
		if (generateSource && generateSource.value) {
			matchConditions.push({ generateSource: generateSource.value });
		} else {
			matchConditions.push({ generateSource: {$in: ['SLACK_GENERATE', 'MICROSOFT_TEAMS_GENERATE', 'GOOGLE_CHAT_GENERATE', 'AUTOFILL_GENERATE', 'ANSWER_GENERATE']}});
		}
		// Return the pipeline array for the MongoDB aggregate command
		return { $and: matchConditions };
	}
};
