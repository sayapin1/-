const express = require("express");

const AuthController = require("../controllers/auth.controller");
const authToken = require("../middlewares/auth-token");

const router = express.Router();
const authController = new AuthController();

router.get("/", authToken, authController.getMember); // 인증토큰
router.post("/register", authController.registerMember); // 회원가입
router.post("/login", authController.loginAuth); // 로그인
router.post("/logout", authToken, authController.logoutAuth); // 로그아웃

module.exports = router;
