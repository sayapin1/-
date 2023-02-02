const { QueryTypes } = require('sequelize');
const { sequelize } = require('../models/index');
class MembersRepository {
    constructor(membersModel) {
        this.membersModel = membersModel
    }

    getMemberList = async () => {
        return await this.membersModel.findAll(
            {where : {
                level: 0
                }}
        );
    }

    getMembershipLevel = async (memberId) => {
        const query = `SELECT level from Members WHERE id=?`

        const [{level}] = await sequelize.query(query, {
            type: QueryTypes.SELECT,
            replacements: [memberId]
        })

        return level
    }

    editMembershipLevel = async (memberId, afterLevel) => {
        await this.membersModel.update(
            { level: afterLevel }, {
                where: { id: memberId }
            }
        )
    }




}


module.exports = MembersRepository

