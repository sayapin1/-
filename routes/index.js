const express = require("express");
const router = express.Router();

const authRouter = require("./auth/auth.route");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.use("/api/auth", authRouter);

module.exports = router;
