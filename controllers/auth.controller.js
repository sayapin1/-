const e = require("express");
const AuthService = require("../services/auth.service");
require("dotenv").config();

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
    }

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
    }

  // 회원가입
  registerMember = async (req, res, next) => {
      const { loginId, loginPw, checkPassword, memberName } = req.body;

      const response = await this.authService.registerMember(
        loginId,
        loginPw,
        checkPassword,
        memberName
      );

      if (response.code !== 201) {
        return res.status(response.code).send("<script>alert(response.message); location.href='/register'</script>")
      }

      return res.status(response.code).redirect("/login");
  };

  // 마이페이지
  getMember = async (req, res, next) => {
      const { loginId } = req.authInfo;
      const response = await this.authService.findMember(loginId);

      if (response.code !== 200) {
        return res.status(response.code).json({message: response.message})
      }

      return res.status(response.code).render("mypage", {
        data: response.data.dataValues,
        loginId: true,
        title: "마이페이지",
      });
  };

  loginAuth = async (req, res, next) => {
      const { loginId, loginPw } = req.body;

      // if (typeof req.cookies.accessToken !== "undefined") {
      //   // res.status(400).json({ errorMessage: "이미 로그인 되어 있습니다." });
      //   // res.status(400).redirect("/");
      //   alert("이미 로그인 되어 있습니다.");
      //   throw new Error("Login Error");
      // }

      const authInfo = await this.authService.loginMember(loginId, loginPw);

      // if (typeof authInfo.message !== "undefined") {
      //   throw authInfo;
      //   // if (auth.message === "ID Error") {
      //   //   return res.status(404).alert("아이디가 존재하지 않습니다.");
      //   // } else if (auth.message === "Passwrd Error") {
      //   //   return res.status(400).alert("비밀번호가 틀렸습니다.");
      //   // }
      // }
    if(authInfo.code !== 200){
      return res.status(authInfo.code).send(
            '<script>alert(authInfo.message); location.href="/login"</script>'
          )
    }

      const {accessToken, refreshToken} = authInfo;
      res.cookie("accessToken", accessToken);
      res.cookie("refreshToken", refreshToken);
      console.log(authInfo.message);
      // console.log("data :", data);
      res.status(authInfo.code).redirect("/");
  };

  // 로그아웃
  logoutAuth = (req, res, next) => {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    res.status(200).json({ message: "로그아웃 성공" }); // 로그아웃 성공 시 /mainpage 로 이동 (임시 /)
  };
}

module.exports = AuthController;
