export default {
	// NOTE: these use regular method syntax (name() {...}), not arrow
	// functions (name: () => {...}). Arrow functions in a JS Object do
	// NOT bind `this` to the object, so `this.truncate(...)` below would
	// fail if downloadXLSX were an arrow function. Regular methods do.

	// Excel hard-limits any cell to 32,767 characters. SheetJS throws
	// "Text length must not exceed 32767 characters" if we hand it more.
	// Trim with a safety margin and mark that it was cut, rather than
	// letting the whole export fail because of one long field.
	truncate(value) {
		const MAX_CELL_LENGTH = 32000;
		if (typeof value === "string" && value.length > MAX_CELL_LENGTH) {
			return value.slice(0, MAX_CELL_LENGTH) + "...[truncated]";
		}
		return value;
	},

	downloadXLSX() {
		const rows = ai_teammate.tableData; // <-- replace with your table's real name

		if (!rows || rows.length === 0) {
			showAlert("No data to export", "warning");
			return;
		}

		const cleanRows = rows.map((row) => {
			const out = { ...row }; // keeps ALL original fields

			// Pull readable text out of nested objects (same idea as the
			// Python script's extract_response_text / extract_request_text)
			out.request = row.request?.originalUserInput ?? JSON.stringify(row.request);
			out.response = row.response?.response?.[0]?.text ?? JSON.stringify(row.response);

			// Readable date instead of raw epoch ms
			out.created_at = moment(row.created_at).format("YYYY-MM-DD HH:mm:ss");

			// Apply the same client/user mappings used elsewhere
			out.client_id = client_mapping_js.getClientMapping(row.client_id);
			out.user_id = user_mapping_js.getuserMapping(row.user_id); // confirm this function name

			// Catch-all: stringify any other object/array field so nothing
			// slips through unreadable
			Object.keys(out).forEach((key) => {
				if (out[key] !== null && typeof out[key] === "object") {
					out[key] = JSON.stringify(out[key]);
				}
			});

			// Apply the 32,767-char safety limit to every field, not just
			// the ones we expect to be long
			Object.keys(out).forEach((key) => {
				out[key] = this.truncate(out[key]);
			});

			return out;
		});


		const worksheet = XLSX.utils.json_to_sheet(cleanRows);
		const workbook = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(workbook, worksheet, "conversations");

		const wbout = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
		const blob = new Blob([wbout], {
			type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
		});
		const url = URL.createObjectURL(blob);

		download(
			url,
			"conversations_export.xlsx",
			"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
		);
	},
};