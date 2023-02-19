const AdminController = require('../../../controllers/admin.controller');
const AdminOutputController = require('../../../controllers/adminOutput.controller')
const io = require('../../../socket');

const mockAdminService = {
    editMembershipLevel: jest.fn(),
    addGoods: jest.fn(),
    editGoods: jest.fn(),
    deleteGoods: jest.fn(),
    completeOrder: jest.fn(),
    getMemberList: jest.fn(),
    getGoodsList: jest.fn(),
    getOrderList: jest.fn(),
    getOneGoods: jest.fn(),
}

let mockRequest = {};

const mockResponse = {
    status: jest.fn(() => mockResponse),
    render: jest.fn(),
    json: jest.fn(),
};

let mockReturnedValue = {}


describe('AdminController', () => {
    let adminController;
    let adminOutputController;
    let next;

    beforeEach(() => {
        adminController = new AdminController();
        adminOutputController = new AdminOutputController();
        adminController.adminService = mockAdminService;
        adminOutputController.adminService = mockAdminService;

        next = jest.fn();
    });

    describe('editMembershipLevel', () => {
        const memberId = '1';
        test('should call AdminService.editMembershipLevel with memberId', async () => {
            mockReturnedValue = {
                code: 200,
                message: 'Success',
                data: 'data'
            };

            mockAdminService.editMembershipLevel = jest.fn(() => {
                return mockReturnedValue;
            });

            mockRequest = ({
                params: {
                    memberId,
                },
            });

            await adminController.editMembershipLevel(mockRequest, mockResponse);

            expect(mockAdminService.editMembershipLevel).toHaveBeenCalledWith(mockRequest.params.memberId);
            expect(mockResponse.status).toHaveBeenCalledWith(mockReturnedValue.code);
            expect(mockResponse.json).toHaveBeenCalledWith({message: mockReturnedValue.message, data: mockReturnedValue.data});
        });

    });

    describe('addGoods', () => {
        test('should call adminService.addGoods with the correct arguments', async () => {
            mockRequest = {
                body: {
                    goodsName: 'Test Goods',
                    price: 100,
                    detail: 'Test detail',
                },
            };
            mockReturnedValue = {
                code: 200,
                message: 'Goods added successfully',
            };

            mockAdminService.addGoods = jest.fn(() => {
                return mockReturnedValue;
            });

            const mockEmit = jest.fn();
            io.getIO = jest.fn(() => ({emit: mockEmit}));

            await adminController.addGoods(mockRequest, mockResponse);

            expect(mockAdminService.addGoods).toHaveBeenCalledWith(
                mockRequest.body.goodsName,
                mockRequest.body.price,
                mockRequest.body.detail,
                'this is photo'
            );
            expect(mockEmit).toHaveBeenCalledWith('addGoods', {goodsName: mockRequest.body.goodsName});
            expect(mockResponse.status).toHaveBeenCalledWith(mockReturnedValue.code);
            expect(mockResponse.json).toHaveBeenCalledWith({message: mockReturnedValue.message});
        });
    });

    describe('editGoods', () => {
        test('should call adminService.editGoods with the correct arguments', async () => {
            mockReturnedValue = {
                code: 200,
                message: 'Goods updated successfully',
            };
            mockRequest = {
                params: {
                    goodsId: 'test-id',
                },
                body: {
                    goodsName: 'Test Goods',
                    price: 100,
                    detail: 'Test detail',
                    photo: 'Test photo',
                },
            };

            mockAdminService.editGoods = jest.fn(() => {
                return mockReturnedValue;
            });

            await adminController.editGoods(mockRequest, mockResponse);

            expect(mockAdminService.editGoods).toHaveBeenCalledWith(
                mockRequest.params.goodsId,
                mockRequest.body.goodsName,
                mockRequest.body.price,
                mockRequest.body.detail,
                mockRequest.body.photo
            );
            expect(mockResponse.status).toHaveBeenCalledWith(mockReturnedValue.code);
            expect(mockResponse.json).toHaveBeenCalledWith({message: mockReturnedValue.message});
        });
    });

    describe('deleteGoods', () => {
        it('should call the adminService.deleteGoods method with the correct arguments and return a response with a status code of 200', async () => {
            mockRequest = {
                params: {
                    goodsId: 'test-id',
                },
            };

            mockReturnedValue = {
                code: 200,
                message: 'Goods deleted successfully',
            };
            mockAdminService.deleteGoods = jest.fn(() => {
                return mockReturnedValue;
            });

            await adminController.deleteGoods(mockRequest, mockResponse);

            expect(mockAdminService.deleteGoods).toHaveBeenCalledWith(mockRequest.params.goodsId);
            expect(mockResponse.status).toHaveBeenCalledWith(mockReturnedValue.code);
            expect(mockResponse.json).toHaveBeenCalledWith({message: mockReturnedValue.message});
        });
    })

    describe('completeOrder', () => {
        test('should call AdminService.completeOrder with orderId', async () => {
            mockReturnedValue = {
                code: 200,
                message: 'Success',
            };

            mockRequest = {
                params: {
                    orderId: 1,
                },
            };

            mockAdminService.completeOrder = jest.fn(() => {
                return mockReturnedValue;
            });

            await adminController.completeOrder(mockRequest, mockResponse);

            expect(mockAdminService.completeOrder).toHaveBeenCalledWith(mockRequest.params.orderId);
            expect(mockResponse.status).toHaveBeenCalledWith(mockReturnedValue.code);
            expect(mockResponse.json).toHaveBeenCalledWith({message: mockReturnedValue.message});
        });
    });

    describe("addGoodsPage", () => {
        test("should render addGoods page with proper data", async () => {
            mockRequest = {
                authInfo: {
                    level: 1
                }
            }

            await adminOutputController.addGoodsPage(mockRequest, mockResponse, next);

            expect(mockResponse.render).toHaveBeenCalledWith("addGoods", {
                loginId: true,
                title: "goods creating page",
            });
        });

        test("should return 400 if user does not have level 1 access", async () => {
            mockRequest = {
                authInfo: {
                    level: 0
                }
            }

            await adminOutputController.addGoodsPage(mockRequest, mockResponse, next);

            expect(mockResponse.status).toHaveBeenCalledWith(400);
            expect(mockResponse.json).toHaveBeenCalledWith({
                message: "권한이 없습니다.",
            });
        });
    });

    describe('getAdminPage', () => {
        test('should render admin page with correct parameters', async () => {
            mockRequest = {
                authInfo: {
                    level: 1
                }
            }
            await adminOutputController.getAdminPage(mockRequest, mockResponse, next);
            expect(mockResponse.render).toHaveBeenCalledWith('admin', {
                loginId: true,
                title: 'adminPage',
            });
        });

        test('should return 400 if user level is not 1', async () => {
            mockRequest = {
                authInfo: {
                    level: 0
                }
            }
            await adminOutputController.getAdminPage(mockRequest, mockResponse, next);
            expect(mockResponse.status).toHaveBeenCalledWith(400);
            expect(mockResponse.json).toHaveBeenCalledWith({message: '권한이 없습니다.'});
        });
    });

    describe('getMemberList', () => {
        test('should render manage members page', async () => {
            mockRequest = {
                authInfo: {
                    level: 1
                }
            }

            mockReturnedValue = {
                data: {
                    memberList: {
                        id: 1, name: 'John Doe'
                    }
                }
                ,
                code: 200
            }

            mockAdminService.getMemberList = jest.fn(() => {
                return mockReturnedValue;
            });

            await adminOutputController.getMemberList(mockRequest, mockResponse, next);

            expect(mockAdminService.getMemberList).toHaveBeenCalled()
            expect(mockResponse.status).toHaveBeenCalledWith(mockReturnedValue.code);
            expect(mockResponse.render).toHaveBeenCalledWith('manageMembers', {
                data: mockReturnedValue.data,
                loginId: true,
                title: 'manage members',
            });
        });

        test('should return error message if adminService returns an error', async () => {
            mockRequest = {
                authInfo: {
                    level: 1
                }
            }

            mockReturnedValue = {
                code: 500,
                message: 'Server error'
            }

            mockAdminService.getMemberList = jest.fn(() => {
                return mockReturnedValue;
            });

            await adminOutputController.getMemberList(mockRequest, mockResponse, next);
            expect(mockResponse.status).toHaveBeenCalledWith(mockReturnedValue.code);
            expect(mockResponse.json).toHaveBeenCalledWith({message: mockReturnedValue.message});
        });

        test('should return 400 if user level is not 1', async () => {
            mockRequest = {
                authInfo: {
                    level: 0
                }
            }

            await adminOutputController.getMemberList(mockRequest, mockResponse, next);
            expect(mockResponse.status).toHaveBeenCalledWith(400);
            expect(mockResponse.json).toHaveBeenCalledWith({message: '권한이 없습니다.'});
        });
    });

    describe('getGoodsList', () => {
        test('should render the manageGoods page with goods data', async () => {
            mockRequest = {
                authInfo: {
                    level: 1
                }
            }

            const fakeGoodsData = [{id: 1, name: 'product 1', price: 100}, {
                id: 2,
                name: 'product 2',
                price: 200
            }, {id: 3, name: 'product 3', price: 300},];
            mockReturnedValue = {code: 200, data: fakeGoodsData};

            mockAdminService.getGoodsList = jest.fn(() => mockReturnedValue);

            await adminOutputController.getGoodsList(mockRequest, mockResponse, next);

            expect(mockAdminService.getGoodsList).toHaveBeenCalled();
            expect(mockResponse.status).toHaveBeenCalledWith(mockReturnedValue.code);
            expect(mockResponse.render).toHaveBeenCalledWith('manageGoods', {
                data: mockReturnedValue.data,
                loginId: true,
                title: 'manage goods',
            });
        });

        test('should return an error message if there was a problem fetching goods data', async () => {
            mockRequest = {
                authInfo: {
                    level: 1
                }
            }
            const fakeErrorMessage = 'Error fetching goods data';
            mockReturnedValue = {code: 500, message: fakeErrorMessage};
            mockAdminService.getGoodsList = jest.fn(() => mockReturnedValue);

            await adminOutputController.getGoodsList(mockRequest, mockResponse, next);

            expect(mockAdminService.getGoodsList).toHaveBeenCalled();
            expect(mockResponse.status).toHaveBeenCalledWith(mockReturnedValue.code);
            expect(mockResponse.json).toHaveBeenCalledWith({message: mockReturnedValue.message});
        });
    });

    describe('getOrderList', () => {
        test('should render the manageOrders page with order data', async () => {
            mockRequest = {
                authInfo: {
                    level: 1
                }
            }

            const fakeOrderData = [{id: 1, user: 'user1', date: '2022-02-01'}, {
                id: 2,
                user: 'user2',
                date: '2022-02-02'
            }, {id: 3, user: 'user3', date: '2022-02-03'},];
            mockReturnedValue = {code: 200, data: fakeOrderData};
            mockAdminService.getOrderList = jest.fn(() => mockReturnedValue);

            await adminOutputController.getOrderList(mockRequest, mockResponse, next);

            expect(mockAdminService.getOrderList).toHaveBeenCalled();
            expect(mockResponse.status).toHaveBeenCalledWith(mockReturnedValue.code);
            expect(mockResponse.render).toHaveBeenCalledWith('manageOrders', {
                data: mockReturnedValue.data,
                loginId: true,
                title: 'manage orders',
            });
        });

        test('should return an error message if there was a problem fetching order data', async () => {
            mockRequest = {
                authInfo: {
                    level: 1
                }
            }

            const fakeErrorMessage = 'Error fetching order data';
            mockReturnedValue = {code: 500, message: fakeErrorMessage};
            mockAdminService.getOrderList = jest.fn(() => mockReturnedValue);

            await adminOutputController.getOrderList(mockRequest, mockResponse, next);

            expect(mockAdminService.getOrderList).toHaveBeenCalled();
            expect(mockResponse.status).toHaveBeenCalledWith(mockReturnedValue.code);
            expect(mockResponse.json).toHaveBeenCalledWith({message: mockReturnedValue.message});
        });
    });

    describe("editGoodsPage", () => {
        test("should render editGoods page with proper data", async () => {
            mockRequest.authInfo = {level: 1};
            mockRequest.params = {goodsId: 1};

            mockReturnedValue = {
                code: 200,
                data: {name: "test goods"},
            };
            mockAdminService.getOneGoods = jest.fn(() => mockReturnedValue);

            await adminOutputController.editGoodsPage(mockRequest, mockResponse, next);

            expect(mockResponse.render).toHaveBeenCalledWith("editGoods", {
                data: mockReturnedValue.data,
                loginId: true,
                title: "goods editing page",
            });
        });

        test("should return 400 if user does not have level 1 access", async () => {
            mockRequest.authInfo = {level: 0};
            mockRequest.params = {goodsId: 0};

            await adminOutputController.editGoodsPage(mockRequest, mockResponse, next);

            expect(mockResponse.status).toHaveBeenCalledWith(400);
            expect(mockResponse.json).toHaveBeenCalledWith({
                message: "권한이 없습니다.",
            });
        });
    });
})
