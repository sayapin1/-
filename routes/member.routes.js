const express = require("express");

const MemberController = require("../controllers/member.controller");
const authToken = require("../middlewares/auth-token");

const router = express.Router();
const memberController = new MemberController();

// router.get("/", authToken, memberController.getMember); // 인증토큰
router.post("/register", memberController.registerMember); // 회원가입
router.post("/login", memberController.loginAuth); // 로그인
router.post("/logout", authToken, memberController.logoutAuth); // 로그아웃

module.exports = router;
