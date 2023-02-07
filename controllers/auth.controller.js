const e = require("express");
const AuthService = require("../services/auth.service");
require("dotenv").config();

const io = require("../socket");
const socket = require("../socket");

class AuthController {
  authService = new AuthService();

  //로그인페이지
  getLoginPage = (req, res, next) => {
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
  };

  //회원가입페이지
  getRegisterPage = (req, res, next) => {
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
  };

  // 회원가입
  registerMember = async (req, res, next) => {
    const { loginId, loginPw, checkPassword, memberName } = req.body;

    const response = await this.authService.registerMember(
      loginId,
      loginPw,
      checkPassword,
      memberName
    );

    return res.status(response.code).json({ message: response.message });
    // return res.status(response.code).send("<script>alert(response.message); location.href='/register'</script>")
  };

  // 마이페이지
  getMember = async (req, res, next) => {
    const { loginId } = req.authInfo;
    const response = await this.authService.findMember(loginId);

    if (response.code !== 200) {
      return res.status(response.code).json({ message: response.message });
    }

    return res.status(response.code).render("mypage", {
      data: response.data.dataValues,
      loginId: true,
      title: "마이페이지",
    });
  };

  loginAuth = async (req, res, next) => {
    const { loginId, loginPw } = req.body;

    const response = await this.authService.loginMember(loginId, loginPw);

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

module.exports = AuthController;
