const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const MembersRepository = require("../repositories/members.repository");
const { Members } = require("../models");

class AuthService {
  membersRepository = new MembersRepository(Members);
  registerMember = async (loginId, loginPw, checkPassword, memberName) => {
    const validateId = /^[a-z0-9]{3,10}$/gs; // 숫자, 영어 소문자로만 3~10 글자, 글자 중간 공백 불가
    const validatePassword = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{5,10}/gs; // 숫자, 영어 대소문자, 특수문자 각 1글자 이상 포함, 5~10글자, 글자 중간 공백 불가
    try {
      if (!loginId || !loginPw || !checkPassword || !memberName) {
        return { code: 400, message: "모든 항목을 입력해주세요." };
      }

      if (!validateId.test(loginId)) {
        return {code: 400, message: "아이디가 작성 형식과 맞지 않습니다.",
        };
      }
      if (!validatePassword.test(loginPw)) {
        return {code: 400, message: "비밀번호가 작성 형식과 맞지 않습니다.",
        };
      }
      if (loginPw !== checkPassword) {
        return {
          code: 400, message: "비밀번호가 비밀번호 확인란과 다릅니다.",
        };
      }

      const duplicateMember = await this.membersRepository.findMember(loginId)
      if (duplicateMember) {
        return {code: 400, message: "이미 가입된 아이디가 있습니다",
        };
      }

      const encryptPassword = await bcrypt.hash(loginPw, saltRounds);
      await this.membersRepository.createMember(
        loginId,
        encryptPassword,
        memberName
      );
      return { code:200, message: '회원 가입에 성공하였습니다.'};
    } catch (error) {
      console.error(error);
      return {code: 500, message: "요청이 올바르지 않습니다."};
    }
  };

  findMember = async (loginId) => {
    try {
      const member = await this.membersRepository.findMember(loginId);
      return member;
    } catch (error) {
      return error;
    }
  };

  loginMember = async (loginId, loginPw) => {
    try {
      if (!loginId || !loginPw) {
        return {code: 400, message: "정보가 유효하지 않습니다." };
      }

      const authInfo = await this.membersRepository.loginMember(loginId);
      if ( !authInfo){
        return {code: 400, message: "ID나 패스워드를 확인해주세요." };
      }

      const check = await bcrypt.compare(loginPw, authInfo.loginPw);

      if (!check) {
        return {code: 400, message: "ID나 패스워드를 확인해주세요." };
      }

      const accessToken = jwt.sign(
        {
          type: "JWT",
          loginId: authInfo.loginId,
          id: authInfo.id,
          level: authInfo.level
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
      return { code: 200, accessToken, refreshToken, message: '로그인에 성공하였습니다.' };
    } catch (error) {
      console.error(error);
      return { code: 500, message: '로그인에 실패하였습니다.' };
    }
  };
}

module.exports = AuthService;
