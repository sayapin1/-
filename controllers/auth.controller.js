const AuthService = require("../services/auth.service");
require("dotenv").config();

class AuthController {
  authService = new AuthService();

  // 회원가입
  registerMember = async (req, res, next) => {
    console.log("이건 뜨겠지4");
    try {
      const { loginId, loginPw, checkPassword, memberName } = req.body;

      const auth = await this.authService.registerMember(
        loginId,
        loginPw,
        checkPassword,
        memberName
      );
      if (typeof auth.errorMessage !== "undefined") {
        return res.status(auth.code).json({ errorMessage: auth.errorMessage });
      }
      res
        .status(201)
        .json({ message: "회원가입에 성공하였습니다.", data: auth });
    } catch (error) {
      console.log("register erorr - controller");
      res.status(400).json({ errorMessage: " 요청이 올바르지 않습니다." });
    }
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
    } catch (erorr) {
      res.status(400).json({ errorMessage: "요청이 올바르지 않습니다." });
    }
  };

  loginAuth = async (req, res, next) => {
    try {
      const { loginId, loginPw } = req.body;

      if (typeof req.cookies.accessToken !== "undefined") {
        res.status(400).json({ errorMessage: "이미 로그인 되어 있습니다." });
        res.status(400).redirect("/");
      }

      if (!loginId || !loginPw) {
        return res
          .status(400)
          .json({ errorMessage: "정보가 유효하지 않습니다." });
      }

      const auth = await this.authService.loginMember(loginId, loginPw);

      if (typeof auth.message !== "undefined") {
        if (auth.message === "ID Error") {
          return res
            .status(404)
            .json({ errorMessage: "아이디가 존재하지 않습니다." });
        } else if (auth.message === "Password Error") {
          return res.status(400).json({ errorMessage: "비밀번호가 틀립니다." });
        }
      }

      const [accessToken, refreshToken] = auth;
      res.cookie("accessToken", accessToken);
      res.cookie("refreshToken", refreshToken);
      res.status(200).json({ message: "로그인 성공" });
    } catch (erorr) {
      console.log(erorr);
      if (erorr.message === "ID Error") {
        res.status(404).json({ errorMessage: "아이디가 존재하지 않습니다." });
      } else if (erorr.message === "Password Error") {
        res.status(400).json({ errorMessage: "비밀번호가 틀립니다." });
      } else if (erorr.message === "Login Error") {
        res.status(400).redirect("/"); // 이미 로그인 상태 /mainpage 로 이동 (임시 /)
      } else {
        res.status(400).redirect("/");
      }
    }
  };

  // 로그아웃
  logoutAuth = (req, res, next) => {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    res.status(200).json({ message: "로그아웃 성공" }); // 로그아웃 성공 시 /mainpage 로 이동 (임시 /)
  };
}

module.exports = AuthController;
