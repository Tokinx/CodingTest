const TingoClass = require('./bll.tingo.class');

module.exports = class TasksClass {
    async getStageData() {
        const tingo = new TingoClass();
        const rows = await tingo.find("tasks");
        return { code: 0, data: rows };
    }
}