const express = require('express');
const router = express.Router();

const AdminRouter = require('./admin.routes');
router.use('/api/admin', AdminRouter)

const OutputRouter = require('./output.routes');
router.use('/', OutputRouter)

const MemberRouter = require('./member.routes');
router.use('/api/member', MemberRouter)

const AuthRouter = require("./auth/auth.route");
router.use("/api/auth", AuthRouter);

module.exports = router;
