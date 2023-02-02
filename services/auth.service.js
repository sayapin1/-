const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { Op } = require("sequelize");

const AuthRepository = require("../repositories/auth.repository");
const { Members } = require("../models");

class AuthService {
  authRepository = new AuthRepository(Members);
  registerMember = async (loginId, loginPw, check_password, memberName) => {
    const validateId = /^[a-z0-9]{3,10}$/gs; // 숫자, 영어 소문자로만 3~10 글자, 글자 중간 공백 불가
    const validatePassword = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{5,10}/gs; // 숫자, 영어 대소문자, 특수문자 각 1글자 이상 포함, 5~10글자, 글자 중간 공백 불가
    try {
      if (!validateId.test(loginId)) {
        return {
          code: 400,
          errorMessage: "아이디가 작성 형식과 맞지 않습니다.",
        };
      }
      if (!validatePassword.test(loginPw)) {
        return {
          code: 400,
          errorMessage: "비밀번호가 작성 형식과 맞지 않습니다.",
        };
      }
      if (loginPw !== check_password) {
        return {
          code: 400,
          errorMessage: "비밀번호가 비밀번호 확인란과 다릅니다.",
        };
      }
      if (!memberName) {
        return { code: 400, errorMessage: "이름이 입력되지 않았습니다." };
      }
      const duplicateMember = await Members.findAll({
        where: {
          [Op.or]: [{ loginId }],
        },
      });
      if (duplicateMember.length) {
        return {
          code: 400,
          errorMessage: "이미 가입된 아이디가 있습니다",
        };
      }
      const encryptPassword = await bcrypt.hash(loginPw, saltRounds);
      const auth = await this.authRepository.createMember(
        loginId,
        encryptPassword,
        memberName
      );
      return auth;
    } catch (erorr) {
      console.log(erorr);
      console.log("register error - service");
      return {
        code: 400,
        errorMessage: "요청이 올바르지 않습니다. - service",
      };
    }
  };

  findMember = async (loginId) => {
    try {
      const member = await this.authRepository.findMember(loginId);

      return member;
    } catch (erorr) {
      return erorr;
    }
  };

  loginMember = async (loginId, loginPw) => {
    try {
      const authInfo = await this.authRepository.loginMember(loginId);

      if (!authInfo) {
        throw new Error("ID Error");
      }

      const check = await bcrypt.compare(loginPw, authInfo.loginPw);

      if (!check) {
        return new Error("Password Error");
      }

      const accessToken = jwt.sign(
        {
          type: "JWT",
          loginId: authInfo.loginId,
        },
        process.env.JWT_ACCESS_SECRET,
        {
          expiresIn: "10m",
        }
      );

      const refreshToken = jwt.sign(
        {
          type: "JWT",
          loginId: authInfo.loginId,
          id: authInfo.id,
          level: authInfo.level
        },
        process.env.JWT_REFRESH_SECRET,
        {
          expiresIn: "7d",
        }
      );
      return [accessToken, refreshToken];
    } catch (erorr) {
      console.log(erorr);
      return erorr;
    }
  };
}

module.exports = AuthService;
