const express = require("express");
const router = express.Router();

const authRouter = require("./auth/auth.route");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

/* GET login page */
router.get("/login", function (req, res, next) {
  res.render("login", { title: "로그인" });
});

/* GET register page */
router.get("/register", function (req, res, next) {
  res.render("register", { title: "회원가입" });
});

router.use("/api/auth", authRouter);

module.exports = router;
