export default {

	// Function to construct Redis keys for the query
	getRedisKeys: () => {
		// Check if both queries have data
		if (!total_licenses_qry?.data || !active_licenses_qry?.data) {
			return []; // Return an empty array if data is missing
		}
		// Return space-separated keys
		const commands = total_licenses_qry.data.map(license => `ACCOUNT_USAGECLIENT_${license.id}_PRODUCT_1_TRANSACTIONS`);

		return `MGET ${commands.join(" ")}`;
	},

	// Function to merge all data after queries are completed
	mergeLicenseData: () => {
		// Check if all required data is available
		if (!total_licenses_qry?.data || !active_licenses_qry?.data || !transaction_consumed_qry?.data) {
			return []; // Return empty array if any data is missing
		}

		const clientIds = total_licenses_qry.data.map(license => license.id);
		const redisResults = transaction_consumed_qry.data || [];

		// Create a map for transaction data
		const transactionData = {};

		// Process Redis results (assuming they're in same order as client IDs)
		if (Array.isArray(redisResults)) {
			clientIds.forEach((clientId, index) => {
				const activeTransactions = redisResults[index]['result'];
				transactionData[clientId] = { 
					active_transactions: activeTransactions
				};
			});
		}

		// Merge all data together
		return total_licenses_qry.data.map((totalLicense) => {
			const activeLicense = active_licenses_qry.data.find(
				active => active.client_id === totalLicense.id
			);

			const redisData = transactionData[totalLicense.id] || 
						{ active_transactions: null };

			return {
				client_id: totalLicense.id,
				total_licenses: totalLicense.total_licenses,
				total_transactions: totalLicense.total_transactions, // Keep original total_transactions
				active_transactions: redisData.active_transactions, // Use Redis data for active_transactions
				active_licenses: activeLicense ? activeLicense.active_licenses : 0
			};
		});
	}
};