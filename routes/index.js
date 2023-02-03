const express = require("express");
const authToken = require("../middlewares/auth-token");
const router = express.Router();

const authRouter = require("./auth/auth.route");

/* GET home page. */
router.get("/", function (req, res, next) {
  if (req.cookies.accessToken === undefined) {
    res.render("index", {
      title: "홈",
      loginId: false,
    });
  } else {
    res.render("index", {
      title: "홈",
      loginId: true,
    });
  }
});

/* GET login page */
router.get("/login", function (req, res, next) {
  if (req.cookies.accessToken === undefined) {
    res.render("login", {
      title: "로그인",
      loginId: false,
    });
  } else {
    res.render("login", {
      title: "로그인",
      loginId: true,
    });
  }
});

/* GET register page */
router.get("/register", function (req, res, next) {
  if (req.cookies.accessToken === undefined) {
    res.render("register", {
      title: "회원가입",
      loginId: false,
    });
  } else {
    res.render("register", {
      title: "회원가입",
      loginId: true,
    });
  }
});

router.use("/api/auth", authRouter);

module.exports = router;
