export default {
  cleanTableDataForAnswer() {
    return questions_answered_qry.data.map(row => {
      const cleanedRow = {};
      for (const key in row) {
        // If a value is a string and contains newlines, replace them with spaces
        cleanedRow[key] = typeof row[key] === 'string' ? row[key].replace(/\n/g, '  ') : row[key];
      }
      return cleanedRow;
    });
  }
};
