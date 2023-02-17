const AdminService = require('../services/admin.service');

const io = require("../socket");
const socket = require("../socket");

class AdminController {
    adminService = new AdminService();

    editMembershipLevel = async (req, res, next) => {
        const { memberId } = req.params
        const response = await this.adminService.editMembershipLevel(memberId);
       res.status(response.code).json({ message: response.message, data: response.data });
    }

    addGoods = async (req, res, next) => {
        const { goodsName, price, detail } = req.body;
        const photo = "this is photo"
        const response = await this.adminService.addGoods(goodsName, price, detail, photo);
        
        io.getIO().emit("addGoods", {
            goodsName: goodsName
          });

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