export default {
	getMatchQuery() {
	  console.log('Preparing filter query for Feedback');
  
	  // Construct filter
	  let match_query = {
		created: {
			$gte: new Date(start_date.selectedDate).getTime(),
			$lte: new Date(end_date.selectedDate).getTime(),
			// $gte: startDate.selectedDate,
			// $lte: endDate.selectedDate
		}
	  };
  
	  // Apply optional filters
	  if (client_id && client_id.selectedOptionValue) {
		match_query.client_id = client_id.selectedOptionValue;
	  }
	  
	  if (user_id && user_id.selectedOptionValue) {
		match_query.created_by = user_id.selectedOptionValue;
	  }
  
	  console.log('Generated match_query:', match_query);
  
	  return match_query;
	}
  };
  