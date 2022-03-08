const TingoClass = require('./bll.tingo.class');

module.exports = class TasksClass {
    async getStageData() {
        const tingo = new TingoClass();
        const rows = await tingo.find("tasks", null, {
            sort: { Priority: 1 }
        });
        return { code: 0, data: rows };
    }
    async setTaskSort(sorts) {
        const tingo = new TingoClass();
        for (const item of sorts) {
            await tingo.update("tasks", { _id: item._id }, {
                $set: { Priority: item.Priority }
            });
        }
        return { code: 0, msg: 'success' };
    }
}