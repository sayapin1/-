const e = require("express");
const MemberService = require("../services/member.service");
require("dotenv").config();

const io = require("../socket");
const socket = require("../socket");

class MemberOutputController {
  memberService = new MemberService();

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

  // 마이페이지
  getMember = async (req, res, next) => {
    const { loginId, id } = req.authInfo;
    const response = await this.memberService.findMemberInfo(loginId, id);
    console.log(response.data)

    if (response.code !== 200) {
      return res.status(response.code).json({ message: response.message });
    }

    return res.status(response.code).render("mypage", {
      data: response.data,
      loginId: true,
      title: "마이페이지",
    });
  };

}

module.exports = MemberOutputController;
