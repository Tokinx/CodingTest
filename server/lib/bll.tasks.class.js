const TingoClass = require('./bll.tingo.class');

module.exports = class TasksClass {
    async getStageData() {
        const tingo = new TingoClass();
        const rows = await tingo.find("tasks", null, {
            sort: { Priority: 1 }
        });
        return { code: 0, data: rows };
    }

    async setTask(task) {
        const tingo = new TingoClass();
        let result = [task];
        if ('_id' in task) {
            await tingo.update("tasks", { _id: task._id }, { $set: { ...task } });
        } else {
            const total = await tingo.find("tasks", { Stage: task.Stage }, { count: true });
            result = await tingo.insert("tasks", { ...task, Priority: total.length + 1 });
        }
        return { code: 0, data: result.pop() };
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