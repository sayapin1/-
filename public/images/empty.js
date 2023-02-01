await queryInterface.addConstraint("Tokens", {	// FK를 설정할 테이블 (DB에 있는 테이블 이름과 같아야한다.)
      fields: ["userId"],	// FK로 등록할 필드 이름
      type: "foreign key",
      name: "users_tokens_id_fk",
      references: {
        table: "Users",		// 참조할 테이블 (DB에 있는 테이블 이름과 같아야한다.)
        field: "userID",	// 참조할 필드 이름
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });