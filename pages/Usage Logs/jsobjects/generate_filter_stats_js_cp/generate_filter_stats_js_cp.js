export default {
	async fetchData() {
		try {
			const [result1, result2, result3] = await Promise.all([
				no_information_count_qry.run(),
				total_questions_count_qry.run(),
				total_transactions_sum_qry.run()
			]);
			const total_questions = result2['n']
			const no_information_found = result1['n']
			const answered_questions = total_questions - no_information_found
			console.log("answered: ", answered_questions)
			// if (total_questions && no_information_found) {
			// answered_questions = total_questions - no_information_found
			// }
			// return { total_questions: total_questions, no_information_found: no_information_found, answered_questions: answered_questions };
			return { total_questions: total_questions, no_information_found: no_information_found, answered_questions: answered_questions, total_transactions: result3[0]['total'] };
		} catch (error) {
			return { error: error.message };
		}
	}
};