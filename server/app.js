var createError = require('http-errors');
var express = require('express');
var app = express();
var path = require('path');
var logger = require('tracer');
var tingoDB = require('tingodb')().Db;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', express.static(path.join(__dirname, 'dist')));
app.use('/api', require('./routes/index'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

!(async function init() {
  global.$tingo = new tingoDB(path.join(__dirname, "tingodb"), {
    // 仅在内存中启用
    memStore: false,
    // 每个集合的最大缓存对象数
    cacheSize: 1000,
    // 缓存对象大小
    cacheMaxObjSize: 1024,
    // 支持嵌套数组搜索，建议关闭
    searchInArray: false
  });
  global.$logger = logger.dailyfile({
    root: path.join(__dirname, "log"),
    maxLogFiles: 7
  });
})();

module.exports = app;
