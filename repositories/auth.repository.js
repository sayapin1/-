class AuthRepository {
  constructor(membersModel) {
    this.membersModel = membersModel;
  }

  createMember = async (loginId, encryptPassword, memberName) => {
    try {
      console.log(1);
      const member = await this.membersModel.create({
        loginId,
        loginPw: encryptPassword,
        memberName,
      });

      return member;
    } catch (erorr) {
      console.log("register error - repository");
      return erorr;
    }
  };

  findMember = async (loginId) => {
    try {
      const member = await this.membersModel.findOne({
        attributes: ["loginId", "memberName", "level"],
        where: { loginId: loginId },
      });

      return member;
    } catch (erorr) {
      console.log(erorr);
      return erorr;
    }
  };

  loginMember = async (loginId) => {
    try {
      const member = await this.membersModel.findOne({
        where: { loginId: loginId },
      });

      return member;
    } catch (erorr) {
      console.log(erorr);
      return erorr;
    }
  };
}

module.exports = AuthRepository;
