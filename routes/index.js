const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

const AdminRouter = require('../../test/admin.routes');
router.use('/api/admin', AdminRouter)

const outputRouter = require('../sosam/routes/output.routes');
router.use('/', outputRouter)

module.exports = router;
