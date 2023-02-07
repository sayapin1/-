
const express = require("express");
const authToken = require("../middlewares/auth-token");
const router = express.Router();

const AdminRouter = require('./admin.routes');
router.use('/api/admin', AdminRouter)

const OutputRouter = require('./output.routes');
router.use('/', OutputRouter)

const CartRouter = require('./cart.routes');
router.use('/api/cart', CartRouter)

const AuthRouter = require("./auth.routes");
router.use("/api/auth", AuthRouter);

module.exports = router;
