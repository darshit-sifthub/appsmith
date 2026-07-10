export default {
	/**
 * SHARED XLSX EXPORT UTILITY — install once, reuse for every table.
 * Same pattern as CSVExportUtils, but for xlsx via SheetJS.
 *
 * Requires SheetJS installed as a library:
 * https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js
 *
 * Uses regular method syntax (name() {...}), not arrow functions,
 * so `this.truncate(...)` correctly resolves within this object.
 */
	// Excel hard-limits any cell to 32,767 characters.
	truncate(value) {
		const MAX_CELL_LENGTH = 32000;
		if (typeof value === "string" && value.length > MAX_CELL_LENGTH) {
			return value.slice(0, MAX_CELL_LENGTH) + "...[truncated]";
		}
		return value;
	},

	/**
   * @param {Array<Object>} rawRows   e.g. Table1.tableData
   * @param {Object} fieldConfig     ONLY list fields needing special handling:
   *   {
   *     client_id: { label: "Client", transform: (v, row) => client_mapping_js.getClientMapping(v) },
   *     created_at: { label: "Date", transform: (v) => moment(v).format("YYYY-MM-DD HH:mm:ss") },
   *     _id: { skip: true },
   *   }
   *   Any field not listed passes through as-is if primitive, or gets
   *   auto-JSON.stringify'd if it's an object/array.
   * @param {string} filename
   * @param {string} sheetName
   */
	exportTableAsXLSX(rawRows, fieldConfig, filename, sheetName) {
		if (!rawRows || rawRows.length === 0) {
			showAlert("No data to export", "warning");
			return;
		}
		fieldConfig = fieldConfig || {};
		filename = filename || "export.xlsx";
		sheetName = sheetName || "data";

		const allKeys = Object.keys(rawRows[0]);

		// Preserve fieldConfig key order; append any data keys not mentioned in config at the end.
		const orderedKeys = [
			...Object.keys(fieldConfig).filter((k) => allKeys.includes(k)),
			...allKeys.filter((k) => !(k in fieldConfig)),
		];

		const rows = rawRows.map((row) => {
			const out = {};
			orderedKeys.forEach((key) => {
				const cfg = fieldConfig[key];
				if (cfg && cfg.skip) return;

				const rawVal = row[key];
				const label = (cfg && cfg.label) || key;

				let value;
				if (cfg && cfg.transform) {
					value = cfg.transform(rawVal, row);
				} else if (rawVal !== null && typeof rawVal === "object") {
					value = JSON.stringify(rawVal);
				} else {
					value = rawVal;
				}

				out[label] = this.truncate(value);
			});
			return out;
		});

		const worksheet = XLSX.utils.json_to_sheet(rows);
		const workbook = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

		const wbout = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
		const blob = new Blob([wbout], {
			type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
		});
		const url = URL.createObjectURL(blob);

		download(
			url,
			filename,
			"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
		);
	},
};