const AdminService = require('../../../services/admin.service');

const mockMembersRepository = {
  getAllMembers: jest.fn(),
  getMembershipLevel: jest.fn(),
  editMembershipLevel: jest.fn(),

};
const mockOrdersRepository = {
  getAllOrders: jest.fn(),
  getOneOrder: jest.fn(),
  findIfCompleted: jest.fn(),
  completeOrder: jest.fn(),
};
const mockGoodsRepository = {
  getAllGoods: jest.fn(),
  getOneGoods: jest.fn(),
  findIfDuplicated: jest.fn(),
  addGoods: jest.fn(),
  editGoods: jest.fn(),
  deleteGoods: jest.fn(),
};

let mockReturnedValue = {}

describe('AdminService', () => {
  let adminService;

  beforeEach(() => {

    adminService = new AdminService();
    adminService.membersRepository = mockMembersRepository;
    adminService.ordersRepository = mockOrdersRepository;
    adminService.goodsRepository = mockGoodsRepository;
  });

  describe('getMemberList', () => {
    test('should return a list of members', async () => {

      mockReturnedValue = [{id: 1, name: 'John Doe'}, {id: 2, name: 'Jane Smith'}];
      mockMembersRepository.getAllMembers = jest.fn(() => mockReturnedValue);

      const result = await adminService.getMemberList();

      expect(result.code).toBe(200);
      expect(result.data).toBe(mockReturnedValue);
    });

    test('should return an error message if an error occurs', async () => {

      mockMembersRepository.getAllMembers = jest.fn(() => {
        throw new Error('test error');
      });

      const result = await adminService.getMemberList();

      expect(result.code).toBe(500);
      expect(result.message).toBe('회원 목록 불러오기 오류');
    });
  });

  describe('getGoodsList', () => {
    test('should return a list of goods', async () => {

      mockReturnedValue = [{id: 1, name: 'Test Goods 1'}, {id: 2, name: 'Test Goods 2'}];
      mockGoodsRepository.getAllGoods = jest.fn(() => mockReturnedValue);

      const result = await adminService.getGoodsList();

      expect(result.code).toBe(200);
      expect(result.data).toBe(mockReturnedValue);
    });

    test('should return an error message if an error occurs', async () => {

      mockGoodsRepository.getAllGoods = jest.fn(() => {
        throw new Error('test error');
      });

      const result = await adminService.getGoodsList();

      expect(result.code).toBe(500);
      expect(result.message).toBe('상품 목록 불러오기 오류');
    });
  });

  describe('getOrderList', () => {
    test('should return a list of orders', async () => {
      mockReturnedValue = [{id: 1, member: {id: 1, name: 'John Doe'}, goods: {id: 1, name: 'Test Goods'}}];
      mockOrdersRepository.getAllOrders = jest.fn(() => mockReturnedValue);

      const result = await adminService.getOrderList();

      expect(result.code).toBe(200);
      expect(result.data).toBe(mockReturnedValue);
    });

    test('should return an error message if an error occurs', async () => {
      mockOrdersRepository.getAllOrders = jest.fn(() => {
        throw new Error('test error');
      });

      const result = await adminService.getOrderList();

      expect(result.code).toBe(500);
      expect(result.message).toBe('주문 목록 불러오기 오류');
    })
  });

  describe('editMembershipLevel', () => {
    const memberId = 1;
    test('should update the membership level of a member and return a success message and the updated member list', async () => {
      const membershipLevel = 1;
      const afterLevel = 0;
      mockReturnedValue = [{id: 1, name: 'John Doe', membershipLevel: afterLevel}, {id: 2, name: 'Jane Smith', membershipLevel: membershipLevel}];
      mockMembersRepository.getMembershipLevel = jest.fn(() => membershipLevel);
      mockMembersRepository.editMembershipLevel = jest.fn(() => {});
      mockMembersRepository.getAllMembers = jest.fn(() => mockReturnedValue);

      const result = await adminService.editMembershipLevel(memberId);

      expect(mockMembersRepository.getMembershipLevel).toHaveBeenCalledWith(memberId);
      expect(mockMembersRepository.editMembershipLevel).toHaveBeenCalledWith(memberId, afterLevel);
      expect(mockMembersRepository.getAllMembers).toHaveBeenCalled();
      expect(result.code).toBe(200);
      expect(result.message).toBe('등급 조정 완료.');
      expect(result.data).toEqual(mockReturnedValue);
    });

    test('should update the membership level of a member and return a success message and the updated member list when the membership level is not 1', async () => {
      const membershipLevel = 0;
      const afterLevel = 1;
      mockReturnedValue = [{id: 1, name: 'John Doe', membershipLevel: afterLevel}, {id: 2, name: 'Jane Smith', membershipLevel: membershipLevel}];
      mockMembersRepository.getMembershipLevel = jest.fn(() => membershipLevel);
      mockMembersRepository.editMembershipLevel = jest.fn(() => {});
      mockMembersRepository.getAllMembers = jest.fn(() => mockReturnedValue);

      const result = await adminService.editMembershipLevel(memberId);

      expect(mockMembersRepository.getMembershipLevel).toHaveBeenCalledWith(memberId);
      expect(mockMembersRepository.editMembershipLevel).toHaveBeenCalledWith(memberId, afterLevel);
      expect(mockMembersRepository.getAllMembers).toHaveBeenCalled();
      expect(result.code).toBe(200);
      expect(result.message).toBe('등급 조정 완료.');
      expect(result.data).toEqual(mockReturnedValue);
    });

    test('should return an error message if an error occurs', async () => {
      mockMembersRepository.getMembershipLevel = jest.fn(() => {
        throw new Error('test error');
      });

      const result = await adminService.editMembershipLevel(memberId);

      expect(result.code).toBe(500);
      expect(result.message).toBe('회원 등급 조정에 실패하였습니다.');
    });
  });

  describe('getOneGoods', () => {
  const mockGoodsId = 1;
  const mockReturnedValue = {id: mockGoodsId, name: 'Test Goods'};

  test('should return the goods data when the goods is found', async () => {
    mockGoodsRepository.getOneGoods = jest.fn(() => mockReturnedValue);

    const result = await adminService.getOneGoods(mockGoodsId);

    expect(result.code).toBe(200);
    expect(result.data).toBe(mockReturnedValue);
  });

  test('should return an error message when the goods is not found', async () => {
    mockGoodsRepository.getOneGoods = jest.fn(() => null);

    const result = await adminService.getOneGoods(mockGoodsId);

    expect(result.code).toBe(404);
    expect(result.message).toBe('상품이 없습니다.');
  });

  test('should return an error message when an error occurs', async () => {
    mockGoodsRepository.getOneGoods = jest.fn(() => {
      throw new Error('test error');
    });

    const result = await adminService.getOneGoods(mockGoodsId);

    expect(result.code).toBe(500);
    expect(result.message).toBe('상품 수정페이지 불러오기 오류');
  });
});

  describe('addGoods', () => {
    test('should return an error if any of the required parameters are missing', async () => {
      const result = await adminService.addGoods('', 10000, 'Test Detail', 'Test Photo');

      expect(result.code).toBe(412);
      expect(result.message).toBe('모든 정보를 추가해주세요.');
    });

    test('should return an error if a duplicate goods already exists', async () => {
      mockGoodsRepository.findIfDuplicated = jest.fn(() => true);

      const result = await adminService.addGoods('Test Goods', 10000, 'Test Detail', 'Test Photo');

      expect(result.code).toBe(412);
      expect(result.message).toBe('같은 이름의 상품이 있습니다.');
    });

    test('should add a new goods and return a success message', async () => {
      mockGoodsRepository.findIfDuplicated = jest.fn(() => false);

      const result = await adminService.addGoods('Test Goods', 10000, 'Test Detail', 'Test Photo');

      expect(result.code).toBe(200);
      expect(result.message).toBe('상품 추가 완료');
      expect(mockGoodsRepository.addGoods).toHaveBeenCalledWith('Test Goods', 10000, 'Test Detail', 'Test Photo');
    });

    test('should return an error message if an error occurs', async () => {
      mockGoodsRepository.addGoods = jest.fn(() => {
        throw new Error('test error');
      });

      const result = await adminService.addGoods('Test Goods', 10000, 'Test Detail', 'Test Photo');

      expect(result.code).toBe(500);
      expect(result.message).toBe('상품 추가 실패');
    });
  });

  describe('editGoods method', () => {
    const testGoodsId = 'testGoodsId';
    const testGoodsName = 'testGoodsName';
    const testPrice = 1000;
    const testDetail = 'testDetail';
    const testPhoto = 'testPhoto';

    test('should return 404 if goods does not exist', async () => {
      mockGoodsRepository.getOneGoods = jest.fn(() => null);

      const result = await adminService.editGoods(testGoodsId, testGoodsName, testPrice, testDetail, testPhoto);

      expect(mockGoodsRepository.getOneGoods).toHaveBeenCalledWith(testGoodsId);
      expect(result.code).toEqual(404);
      expect(result.message).toEqual('상품이 존재하지 않습니다.');
    });

    test('should return 412 if same name of goods already exists', async () => {
      mockReturnedValue = {
        id: 'existingGoodsId',
        goodsName: 'existingGoodsName',
        price: 500,
        detail: 'existingDetail',
        photo: 'existingPhoto'
      };
      mockGoodsRepository.getOneGoods = jest.fn(() => mockReturnedValue);
      mockGoodsRepository.findIfDuplicated = jest.fn(() => true);

      const result = await adminService.editGoods(testGoodsId, 'existingGoodsName', testPrice, testDetail, testPhoto);

      expect(result.code).toEqual(412);
      expect(result.message).toEqual('같은 이름의 상품이 있습니다.');
    });

    test('should update the goods information', async () => {
      mockReturnedValue = {
        id: testGoodsId,
        goodsName: 'originalGoodsName',
        price: 500,
        detail: 'originalDetail',
        photo: 'originalPhoto'
      };
      mockGoodsRepository.getOneGoods = jest.fn(() => mockReturnedValue);
      mockGoodsRepository.findIfDuplicated = jest.fn(() => false);

      const result = await adminService.editGoods(testGoodsId, testGoodsName, testPrice, testDetail, testPhoto);

      expect(result.code).toEqual(200);
      expect(result.message).toEqual('상품 수정 완료.');

      expect(mockGoodsRepository.getOneGoods).toHaveBeenCalledWith(testGoodsId);
      expect(mockGoodsRepository.editGoods).toHaveBeenCalledWith(testGoodsId, testGoodsName, testPrice, testDetail, testPhoto);
    });

    test('should return an error message if an error occurs', async () => {
      const expectedError = new Error('Test Error');
      mockGoodsRepository.getOneGoods.mockRejectedValue(expectedError);
      mockGoodsRepository.editGoods.mockRejectedValue(expectedError);
      mockGoodsRepository.findIfDuplicated.mockRejectedValue(expectedError);

      const result = await adminService.editGoods(testGoodsId, testGoodsName, testPrice, testDetail, testPhoto);

      expect(result.code).toEqual(500);
      expect(result.message).toEqual('상품 수정 실패');
    });
  })

  describe('deleteGoods method', () => {
    const testGoodsId = 1;

    console.error = jest.fn();

    test('should return 404 if goods does not exist', async () => {
        mockGoodsRepository.getOneGoods = jest.fn(() => null);

        const result = await adminService.deleteGoods(testGoodsId);

        expect(mockGoodsRepository.getOneGoods).toHaveBeenCalledWith(testGoodsId);
        expect(result.code).toEqual(404);
        expect(result.message).toEqual('상품이 존재하지 않습니다.');
    });

    test('should delete the goods', async () => {
        const goods = { id: testGoodsId };
        mockGoodsRepository.getOneGoods = jest.fn(() => goods);

        const result = await adminService.deleteGoods(testGoodsId);

        expect(result.code).toEqual(200);
        expect(result.message).toEqual('상품 삭제 완료.');

        expect(mockGoodsRepository.getOneGoods).toHaveBeenCalledWith(testGoodsId);
        expect(mockGoodsRepository.deleteGoods).toHaveBeenCalledWith(testGoodsId);
    });

    test('should return 500 if an error occurs', async () => {
        const errorMessage = 'An error occurred while deleting the goods';
        mockGoodsRepository.getOneGoods.mockRejectedValue(new Error(errorMessage));
        mockGoodsRepository.deleteGoods.mockRejectedValue(new Error(errorMessage));

        const result = await adminService.deleteGoods(testGoodsId);

        expect(result.code).toEqual(500);
        expect(result.message).toEqual('상품 삭제 실패');

        expect(mockGoodsRepository.getOneGoods).toHaveBeenCalledWith(testGoodsId);
        expect(console.error).toHaveBeenCalledWith(new Error(errorMessage));
    });
});

  describe('completeOrder method', () => {
    const orderId = 1;
    console.error = jest.fn();
  test('should return a 404 error when the order does not exist', async () => {
    mockOrdersRepository.getOneOrder = jest.fn(() => null)

    const result = await adminService.completeOrder(orderId);

    expect(mockOrdersRepository.getOneOrder).toHaveBeenCalledWith(orderId);
    expect(result).toEqual({ code: 404, message: '주문이 존재하지 않습니다.' });
  });

  test('should return a 400 error when the order is already completed', async () => {
    mockReturnedValue = { id: orderId, completed: true };
    mockOrdersRepository.getOneOrder = jest.fn(() => mockReturnedValue)
    mockOrdersRepository.findIfCompleted = jest.fn(() => mockReturnedValue)

    const result = await adminService.completeOrder(orderId);

    // Assert
    expect(mockOrdersRepository.getOneOrder).toHaveBeenCalledWith(orderId);
    expect(mockOrdersRepository.findIfCompleted).toHaveBeenCalledWith(orderId);
    expect(result).toEqual({ code: 400, message: '이미 완료된 주문입니다.' });
  });

  test('should return a 200 success code and complete the order when the order is not completed', async () => {
    mockReturnedValue = { id: orderId, completed: false };
    mockOrdersRepository.getOneOrder = jest.fn(() => mockReturnedValue)
    mockOrdersRepository.findIfCompleted = jest.fn(() => null)

    const result = await adminService.completeOrder(orderId);

    expect(mockOrdersRepository.getOneOrder).toHaveBeenCalledWith(orderId);
    expect(mockOrdersRepository.findIfCompleted).toHaveBeenCalledWith(orderId);
    expect(mockOrdersRepository.completeOrder).toHaveBeenCalledWith(orderId);
    expect(result).toEqual({ code: 200, message: '주문 완료' });
  });

  test('should return a 500 error when there is an error completing the order', async () => {
    const error = 'Internal server error';
    mockOrdersRepository.getOneOrder.mockRejectedValue(new Error(error));
    mockOrdersRepository.findIfCompleted.mockRejectedValue(new Error(error));
    mockOrdersRepository.completeOrder.mockRejectedValue(new Error(error));

    const result = await adminService.completeOrder(orderId);

    expect(mockOrdersRepository.getOneOrder).toHaveBeenCalledWith(orderId);
    expect(console.error).toHaveBeenCalledWith(new Error(error));
    expect(result).toEqual({ code: 500, message: '주문 완료 실패' });
  });
});

});
