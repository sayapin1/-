const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

const AdminRouter = require('./admin.routes');
router.use('/api/admin', AdminRouter)

const outputRouter = require('./output.routes');
router.use('/', outputRouter)

module.exports = router;
