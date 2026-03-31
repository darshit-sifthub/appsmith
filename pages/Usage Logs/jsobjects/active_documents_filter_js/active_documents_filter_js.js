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
    
    console.log("Generated match_query:", match_query);
    return match_query;
  }
};
