var express = require('express');
var router = express.Router();
let QueryClass = require('../lib/bll.query.class');
let query = new QueryClass();

router.get('/', async (req, res, next) => {
  res.send({ code: 0, msg: "rest api ok." });
});

router.get('/getStageData', async (req, res, next) => {
  let result = await query.getStageData();
  res.json(result);
});


module.exports = router;
