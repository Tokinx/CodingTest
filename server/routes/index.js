const express = require('express');
const router = express.Router();
const QueryClass = require('../lib/bll.query.class');
const query = new QueryClass();

router.get('/', async (req, res, next) => {
  res.send({ code: 0, msg: "rest api ok." });
});

router.get('/getStageData', async (req, res, next) => {
  let result = await query.getStageData();
  res.json(result);
});

router.get('/import', async (req, res, next) => {
  const _import = new ImportClass();
  let result = await _import.importXlsxData();
  res.json(result);
});

module.exports = router;
