const express = require('express');
const router = express.Router();

// const AdminRouter = require('../../test/admin.routes');
// router.use('/api/admin', AdminRouter)

const outputRouter = require('./output.routes');
router.use('/', outputRouter)

const MemberRouter = require('./member.routes');
router.use('/api/member', MemberRouter)

module.exports = router;
