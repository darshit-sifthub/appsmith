export default {
  getMatchQuery() {
    // Permanent filters
    let match_query = "WHERE is_active = 1 AND is_delete = 0";
    
    // Add client_id filter if user input is available
    if (client_id && client_id.selectedOptionValue) {
      match_query += ` AND client_id = ${client_id.selectedOptionValue}`;
    }
    
    // Add created_by filter if user input is available
    if (user_id && user_id.selectedOptionValue) {
      match_query += ` AND created_by = ${user_id.selectedOptionValue}`;
    }
    
    if (start_date && start_date.selectedDate) {
      // match_query += ` AND created_dt < ${start_date.selectedDate}`;
			match_query += ` AND created_dt > '${start_date.selectedDate}'`;
    }		

    if (end_date && end_date.selectedDate) {
      // match_query += ` AND created_dt > ${end_date.selectedDate}`;
			match_query += ` AND created_dt < '${end_date.selectedDate}'`;
    }
		
    console.log("Generated match_query:", match_query);
    return match_query;
  }
};
