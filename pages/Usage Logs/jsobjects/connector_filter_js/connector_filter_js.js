export default {
  getMatchQuery() {
    let clientIdFilter = ""; // Default is no filter

    if (client_id?.selectedOptionValue) {
      clientIdFilter = `AND cc.client_id = ${client_id.selectedOptionValue}`;
    }

    const match_query = `
      ${clientIdFilter}
    `;

    return match_query.trim();
  }
};