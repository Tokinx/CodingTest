const express = require('express');
const router = express.Router();
const TasksClass = require('../lib/bll.tasks.class');
const ImportClass = require('../lib/bll.import.class');

router.get('/', async (req, res, next) => {
  res.send({ code: 0, msg: "rest api ok." });
});

router.get('/getStageData', async (req, res, next) => {
  const tasks = new TasksClass();
  let result = await tasks.getStageData();
  res.json(result);
});

router.post('/setTask', async (req, res, next) => {
  const tasks = new TasksClass();
  let result = await tasks.setTask(req.body);
  res.send(result);
});

router.post('/setTaskSort', async (req, res, next) => {
  const tasks = new TasksClass();
  let result = await tasks.setTaskSort(req.body);
  res.send(result);
});

router.get('/import', async (req, res, next) => {
  const _import = new ImportClass();
  let result = await _import.importXlsxData();
  res.json(result);
});

module.exports = router;
