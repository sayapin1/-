'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

        await queryInterface.addConstraint("Carts", {	// FK를 설정할 테이블 (DB에 있는 테이블 이름과 같아야한다.)
      fields: ["memberId"],	// FK로 등록할 필드 이름
      type: "foreign key",
      name: "cart_member_id_fk",
      references: {
        table: "Members",		// 참조할 테이블 (DB에 있는 테이블 이름과 같아야한다.)
        field: "id",	// 참조할 필드 이름
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });

    await queryInterface.addConstraint("Carts", {	// FK를 설정할 테이블 (DB에 있는 테이블 이름과 같아야한다.)
      fields: ["goodsId"],	// FK로 등록할 필드 이름
      type: "foreign key",
      name: "cart_goods_id_fk",
      references: {
        table: "Goods",		// 참조할 테이블 (DB에 있는 테이블 이름과 같아야한다.)
        field: "id",	// 참조할 필드 이름
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};