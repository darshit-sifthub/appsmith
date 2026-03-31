export default {
	cleanTableDataForAnswer() {
		return ai_teammate_qry.data.map(row => {
			const cleanedRow = {};
			for (const key in row) {
				// If a value is a string and contains newlines, replace them with spaces
				cleanedRow[key] = typeof row[key] === 'string' ? row[key].replace(/\n/g, '  ') : row[key];
			}
			return cleanedRow;
		});
	},
	cleanTableDataForRFPAnswer() {
		return ai_teammate_rfp_qry.data.map(row => {
			const cleanedRow = {};
			for (const key in row) {
				// If a value is a string and contains newlines, replace them with spaces
				cleanedRow[key] = typeof row[key] === 'string' ? row[key].replace(/\n/g, '  ') : row[key];
			}
			return cleanedRow;
		});
	}
};
