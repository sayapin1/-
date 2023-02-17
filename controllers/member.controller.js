const e = require("express");
const MemberService = require("../services/member.service");
require("dotenv").config();

const io = require("../socket");
const socket = require("../socket");

class MemberController {
  memberService = new MemberService();

  // 회원가입
  registerMember = async (req, res, next) => {
    const { loginId, loginPw, checkPassword, memberName } = req.body;

    const response = await this.memberService.registerMember(
      loginId,
      loginPw,
      checkPassword,
      memberName
    );

    return res.status(response.code).json({ message: response.message });
    // return res.status(response.code).send("<script>alert(response.message); location.href='/register'</script>")
  };

  loginAuth = async (req, res, next) => {
    const { loginId, loginPw } = req.body;

    const response = await this.memberService.loginMember(loginId, loginPw);

    if (response.code !== 200) {
      return res.status(response.code).json({ message: response.message });
      // return res.status(authInfo.code).send('<script>alert(authInfo.message); location.href="/login"</script>')
    }

    const { accessToken, refreshToken } = response;
    console.log("access", accessToken);
    res.cookie("accessToken", accessToken);
    res.cookie("refreshToken", refreshToken);
    console.log(response.message);

    console.log("response :", response);

    io.getIO().emit("loginAuth", {
      loginId: response.loginId,
      level: response.level,
    });

    return res.status(response.code).json({ message: response.message });
  };

  // 로그아웃
  logoutAuth = (req, res, next) => {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    res.status(200).json({ message: "로그아웃 성공" }); // 로그아웃 성공
  };
}

module.exports = MemberController;
