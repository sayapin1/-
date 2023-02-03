const {QueryTypes} = require('sequelize');
const {sequelize} = require('../models/index');
const { Op } = require("sequelize");

class MembersRepository {
    constructor(membersModel) {
        this.membersModel = membersModel
    }

    createMember = async (loginId, encryptPassword, memberName) => {
             return await this.membersModel.create({
                loginId,
                loginPw: encryptPassword,
                memberName,
            });
    };

    findMember = async (loginId) => {
            return await this.membersModel.findOne({
                attributes: ["loginId", "memberName", "level"],
                where: {loginId: loginId},
            });
    };

    loginMember = async (loginId) => {
            return await this.membersModel.findOne({
                where: {loginId: loginId},
            });
    };

    getAllMembers = async () => {
        return await this.membersModel.findAll();
    }

    getMembershipLevel = async (memberId) => {
        const query = `SELECT level
                       from Members
                       WHERE id = ?`

        const [{level}] = await sequelize.query(query, {
            type: QueryTypes.SELECT,
            replacements: [memberId]
        })

        return level
    }

    editMembershipLevel = async (memberId, afterLevel) => {
        await this.membersModel.update(
            {level: afterLevel}, {
                where: {id: memberId}
            }
        )
    }

}


module.exports = MembersRepository

