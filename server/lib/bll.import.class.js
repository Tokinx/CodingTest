let TingoClass = require('./bll.tingo.class');
const xlsx = require('node-xlsx');
const fs = require('fs');
const path = require('path');

function ImportClass() {
    this.importXlsxData = function () {
        fs.unlink(__dirname.replace(path.join("lib"), 'tingodb/tasks'));

        const xlsxPath = __dirname.replace(path.join("lib"), 'Raw Data.xlsx');
        const workSheetsFromFile = xlsx.parse(xlsxPath);
        const rows = [];
      
        for (let sheet of workSheetsFromFile) {
          sheet.data.shift() // 过滤表头
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

module.exports = QueryClass;