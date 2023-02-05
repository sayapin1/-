const e = require("express");
const AuthService = require("../services/auth.service");
require("dotenv").config();

class AuthController {
  authService = new AuthService();

  // 회원가입
  registerMember = async (req, res, next) => {

    try {
      const { loginId, loginPw, check_password, memberName } = req.body;

      const response = await this.authService.registerMember(
        loginId,
        loginPw,
        checkPassword,
        memberName
      );
      if (typeof auth.message !== "undefined") {
        return res.status(400).json({ errorMessage: auth.message });
      }

      console.log("auth.errorMessage:", auth.errorMessage);

      if (auth.errorMessage === "이미 가입된 아이디가 있습니다") {
        return res
          .status(400)
          .send(
            "<script>alert('이미 가입된 아이디가 있습니다'); location.href='/register'</script>"
          );
      } else if (auth.errorMessage === "아이디가 작성 형식과 맞지 않습니다.") {
        return res
          .status(400)
          .send(
            "<script>alert('아이디가 작성 형식과 맞지 않습니다.');location.href='/register'</script>"
          );
      } else if (
        auth.errorMessage === "비밀번호가 작성 형식과 맞지 않습니다."
      ) {
        return res
          .status(400)
          .send(
            "<script>alert('비밀번호가 작성 형식과 맞지 않습니다.');location.href='/register'</script>"
          );
      } else if (
        auth.errorMessage === "비밀번호가 비밀번호 확인란과 다릅니다."
      ) {
        return res
          .status(400)
          .send(
            "<script>alert('비밀번호가 비밀번호 확인란과 다릅니다.');location.href='/register'</script>"
          );
      } else if (auth.errorMessage === "이름이 입력되지 않았습니다.") {
        return res
          .status(400)
          .send(
            "<script>alert('이름이 입력되지 않았습니다.');location.href='/register'</script>"
          );
      }
      res.status(201).redirect("/login");
    } catch (error) {
      console.log("register erorr - controller");
      res.status(400).json({ errorMessage: " 요청이 올바르지 않습니다." });
    }
  };

  // 마이페이지
  getMember = async (req, res, next) => {
    try {
      const { loginId } = req.authInfo;
      const member = await this.authService.findMember(loginId);

      if (typeof member.message !== "undefined") {
        return res
          .status(400)
          .json({ errorMessage: "요청이 올바르지 않습니다1." });
      }

      res.status(200).render("mypage", {
        data: member,
        loginId: true,
        title: "마이페이지",
      });
    } catch (error) {
      res.status(400).json({ errorMessage: "요청이 올바르지 않습니다." });

    }
  };

  loginAuth = async (req, res, next) => {
      const { loginId, loginPw } = req.body;

      // if (typeof req.cookies.accessToken !== "undefined") {
      //   // res.status(400).json({ errorMessage: "이미 로그인 되어 있습니다." });
      //   // res.status(400).redirect("/");
      //   alert("이미 로그인 되어 있습니다.");
      //   throw new Error("Login Error");
      // }

      if (!loginId || !loginPw) {
        return res
          .status(400)
          .send(
            '<script>alert("아이디, 비밀번호를 입력해주세요.");  location.href="/login"</script>'
          );
      }

      const authInfo = await this.authService.loginMember(loginId, loginPw);

      if (authInfo === null) {
        console.log("아이디가 존재하지 않습니다.");
        return res
          .status(404)
          .send(
            '<script>alert("아이디가 존재하지 않습니다."); location.href="/login"</script>'
          );
      }

      if (authInfo === false) {
        console.log("비밀번호를 틀렸습니다.");
        return res
          .status(404)
          .send(
            '<script>alert("비밀번호를 틀렸습니다.");  location.href="/login"</script>'
          );
      }

      // if (typeof authInfo.message !== "undefined") {
      //   throw authInfo;
      //   // if (auth.message === "ID Error") {
      //   //   return res.status(404).alert("아이디가 존재하지 않습니다.");
      //   // } else if (auth.message === "Passwrd Error") {
      //   //   return res.status(400).alert("비밀번호가 틀렸습니다.");
      //   // }
      // }

      const [accessToken, refreshToken] = authInfo;
      res.cookie("accessToken", accessToken);
      res.cookie("refreshToken", refreshToken);
      console.log("로그인 정상");
      // console.log("data :", data);
      res.status(200).redirect("/");
    } catch (erorr) {
      // if (erorr.message === "ID Error") {
      //   res.status(404).json({ errorMessage: "아이디가 존재하지 않습니다." });
      // } else if (erorr.message === "Password Error") {
      //   res.status(400).json({ errorMessage: "비밀번호가 틀립니다." });
      // } else if (erorr.message === "Login Error") {
      //   res.status(400).redirect("/"); // 이미 로그인 상태 /mainpage 로 이동 (임시 /)
      // } else {
      res.status(400).redirect("/login");
      // }
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
