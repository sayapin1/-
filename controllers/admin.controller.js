const AdminService = require('../services/admin.service');

class AdminController {
    adminService = new AdminService();

    getAdminPage = async (req, res, next) => {
        // const {level} = req.authInfo
        // if ( level !== 1) {
        //     return res.status(400).json({message: "권한이 없습니다."})
        // }

        res.render("admin", {
            loginId: true,
            title: "adminPage"
        })
    }

    getMemberList = async (req, res, next) => {
        // const {level} = req.authInfo
        // if ( level !== 1) {
        //     return res.status(400).json({message: "권한이 없습니다."})
        // }

        const response = await this.adminService.getMemberList()
        if (response.data) {
            return res.status(response.code).render("manageMembers", {
                data: response.data,
                loginId: true,
                title: "manage members"
            });
        } else {
            return res.status(response.code).json({message: response.message});
        }
    }

    getGoodsList = async (req, res, next) => {
        // const {level} = req.authInfo
        // if ( level !== 1) {
        //     return res.status(400).json({message: "권한이 없습니다."})
        // }

        const response = await this.adminService.getGoodsList()
        if (response.data) {
            return res.status(response.code).render("manageGoods", {
                data: response.data,
                loginId: true,
                title: "manage goods"
            });
        } else {
            return res.status(response.code).json({message: response.message});
        }
    }

    getOrderList = async (req, res, next) => {
        // const {level} = req.authInfo
        // if ( level !== 1) {
        //     return res.status(400).json({message: "권한이 없습니다."})
        // }

        const response = await this.adminService.getOrderList()
        if (response.data) {
            return res.status(response.code).render("manageOrders", {
                data: response.data,
                loginId: true,
                title: "manage orders"
            });
        } else {
            return res.status(response.code).json({message: response.message});
        }
    }

    addGoodsPage = async (req, res, next) => {
        res.render("addGoods", {
            loginId: true,
            title: "goods creating page"
        })
    }

    editGoodsPage = async (req, res, next) => {
        const { goodsId } = req.params

        const response = await this.adminService.getOneGoods(goodsId)
        res.render("editGoods", {
            data: response.data,
            loginId: true,
            title: "goods editing page"
        })
    }

    editMembershipLevel = async (req, res, next) => {
        const { memberId } = req.params
        const response = await this.adminService.editMembershipLevel(memberId);
       res.status(response.code).json({ message: response.message, data: response.data });
    }

    addGoods = async (req, res, next) => {
        const { goodsName, price, detail } = req.body;
        const photo = "this is photo"
        const response = await this.adminService.addGoods(goodsName, price, detail, photo);
        res.status(response.code).json({ message: response.message });
    }

    editGoods = async (req, res, next) => {
        const { goodsId } = req.params;
        const { goodsName, price, detail, photo } = req.body;
        const response = await this.adminService.editGoods(goodsId, goodsName, price, detail, photo);
        res.status(response.code).json({ message: response.message });
    }

    deleteGoods = async (req, res, next) => {
        const { goodsId } = req.params;
        const response = await this.adminService.deleteGoods(goodsId);
        res.status(response.code).json({ message: response.message });
    }

    completeOrder = async (req, res, next) => {
        const { orderId } = req.params;
        const response = await this.adminService.completeOrder(orderId);
        res.status(response.code).json({ message: response.message });
    }
}

module.exports = AdminController