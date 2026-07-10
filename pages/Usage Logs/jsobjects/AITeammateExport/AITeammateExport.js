export default {
  downloadXLSX() {
    XLSXExportUtils.exportTableAsXLSX(
      ai_teammate.tableData, // <-- replace with the AI Teammate table's real widget name

      {
        created_at: {
          label: "Date",
          transform: (v) => moment(v).format("YYYY-MM-DD HH:mm:ss"),
        },
        client_id: {
          label: "Client",
          transform: (v) => client_mapping_js.getClientMapping(v),
        },
        user_id: {
          label: "User",
          transform: (v) => user_mapping_js.getuserMapping(v),
        },
        request: {
          label: "Request",
          transform: (v) => v?.originalUserInput ?? JSON.stringify(v),
        },
        response: {
          label: "Response",
          transform: (v) => v?.response?.[0]?.text ?? JSON.stringify(v),
        },
        _id: { skip: true },
      },

      "ai_teammate_usage_logs.xlsx", // filename
      "AI Teammate" // sheet name
    );
  },
};