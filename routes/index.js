
const express = require("express");
const router = express.Router();

const AdminRouter = require('./admin.routes');
router.use('/api/admin', AdminRouter)

const OutputRouter = require('./output.routes');
router.use('/', OutputRouter)

const CartRouter = require('./cart.routes');
router.use('/api/cart', CartRouter)

const MemberRouter = require("./member.routes");
router.use("/api/member", MemberRouter);

module.exports = router;
