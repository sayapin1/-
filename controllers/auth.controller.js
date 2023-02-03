const AuthService = require("../services/auth.service");
require("dotenv").config();

class AuthController {
  authService = new AuthService();

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

  };
  // 인증
  getMember = async (req, res, next) => {
    try {
      const { loginId } = req.authInfo;
      const auth = await this.authService.findMember(loginId);
      if (typeof auth.message !== "undefined") {
        return res
          .status(400)
          .json({ errorMessage: "요청이 올바르지 않습니다." });
      }
      res.status(200).render("mypage", {
        data: auth,
        loginId: auth.id,
        memberName: auth.memberName,
      });
    } catch (error) {
      res.status(400).json({ errorMessage: "요청이 올바르지 않습니다." });
    }
  };

  loginAuth = async (req, res, next) => {
      const { loginId, loginPw } = req.body;

      if (typeof req.cookies.accessToken !== "undefined") {
        return res.status(400).json({ errorMessage: "이미 로그인 되어 있습니다." });
        // return res.status(400).redirect("/");
      }

      const response = await this.authService.loginMember(loginId, loginPw);

      if (response.code !== 200) {
      return res.status(response.code).json({ message: response.message });
    }

      const { accessToken, refreshToken} = response;
      res.cookie("accessToken", accessToken);
      res.cookie("refreshToken", refreshToken);

    return res.status(response.code).json({
      message: response.message,
    });

      //

      // res.status(200).json({ message: "로그인 성공" }
    // else if (error.message === "Login Error") {
    //     res.status(400).redirect("/"); // 이미 로그인 상태 /mainpage 로 이동 (임시 /)
    //   } else {
    //     res.status(400).redirect("/");
    //   }
    // }
  };

  // 로그아웃
  logoutAuth = (req, res, next) => {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    res.status(200).json({ message: "로그아웃 성공" }); // 로그아웃 성공 시 /mainpage 로 이동 (임시 /)
  };
}

module.exports = AuthController;
