let TingoClass = require('./bll.tingo.class');
const xlsx = require('node-xlsx');
const path = require('path');

module.exports = class ImportClass {
    importXlsxData() {
        const xlsxPath = __dirname.replace(path.join("lib"), 'Raw Data.xlsx');
        const workSheetsFromFile = xlsx.parse(xlsxPath);
        const rows = [];

        for (let sheet of workSheetsFromFile) {
            sheet.data.shift() // Ignore first line
            if (sheet.data.length > 0) {
                for (let row of sheet.data) {
                    if (row.length < 1 || typeof row != "object") continue;
                    const [Task, Priority, Description, By_who, Stage] = row;
                    rows.push({ Task, Priority, Description, By_who, Stage });
                }
            }
        }

        const tingo = new TingoClass();

        rows.forEach(row => {
            tingo.insert("tasks", row);
        });

        return { code: 0, msg: "success" };
    }
}
