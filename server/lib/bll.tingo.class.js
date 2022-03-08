var Promise = require('promise');

function TingoClass() {
    /**
     * 查询符合条件的文档
     * @param {string} collection 集合名称
     * @param {object} query      查询条件
     * @param {object} options    其他条件(skip,limit,projection,sort等)
     */
    this.find = function (collection, query, options) {
        return Promise.resolve({
            then: function (onFulfill, onReject) {
                let db = $tingo.collection(collection);
                db.find(query, options).toArray(function (err, result) {
                    if (err) {
                        onReject(err);
                    } else {
                        onFulfill(result);
                    }
                });
            }
        });
    };

    /**
     * 插入单个文档
     * @param {string} collection 集合名称
     * @param {object} document   单个文档
     */
    this.insert = function (collection, document) {
        return Promise.resolve({
            then: function (onFulfill, onReject) {
                let db = $tingo.collection(collection);
                db.insert(document, function (err, result) {
                    if (err) {
                        onReject(err);
                    } else {
                        onFulfill(result);
                    }
                });
            }
        });
    };

    /**
     * 更新符合条件的单个文档
     * @param {string} collection 集合名称
     * @param {object} query      查询条件
     * @param {object} update     更新内容
     */
    this.update = function (collection, query, update) {
        return Promise.resolve({
            then: function (onFulfill, onReject) {
                let db = $tingo.collection(collection);
                db.update(query, update, function (err, result) {
                    if (err) {
                        onReject(err);
                    } else {
                        onFulfill(result);
                    }
                });
            }
        });
    };

    /**
     * 删除符合条件的单个文档
     * @param {string} collection 集合名称
     * @param {object} query      查询条件
     */
    this.deleteOne = function (collection, query) {
        return Promise.resolve({
            then: function (onFulfill, onReject) {
                let db = $tingo.collection(collection);
                db.deleteOne(query, function (err, result) {
                    if (err) {
                        onReject(err);
                    } else {
                        onFulfill(result);
                    }
                });
            }
        });
    };

    /**
     * 删除符合条件的多个文档
     * @param {string} collection 集合名称
     * @param {object} query      查询条件
     */
    this.deleteMany = function (collection, query) {
        return Promise.resolve({
            then: function (onFulfill, onReject) {
                let db = $tingo.collection(collection);
                db.deleteMany(query, function (err, result) {
                    if (err) {
                        onReject(err);
                    } else {
                        onFulfill(result);
                    }
                });
            }
        });
    };
}

module.exports = TingoClass;