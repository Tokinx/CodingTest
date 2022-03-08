let TingoClass = require('./bll.tingo.class');

function QueryClass() {
    this.getStageData = function () {
        return { code: 0, msg: "getStageData" };
    }
}

module.exports = QueryClass;