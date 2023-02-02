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
        const {level} = await this.membersModel.findOne( {
        attributes: ['level']},
        {where: { id: memberId }})

        console.log(level);
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

