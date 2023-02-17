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
}

let mockRequest = {};

const mockResponse = {
    status: jest.fn(() => mockResponse),
    render: jest.fn(),
    json: jest.fn(),
};


describe('AdminController', () => {
    let adminController;
    let adminOutputController;
    let next;

    beforeEach(() => {
        adminController = new AdminController();
        adminOutputController = new AdminOutputController();
        adminController.adminService = mockAdminService;

        next = jest.fn();
    });

    describe('editMembershipLevel', () => {
        const memberId = '1';
        test('should call AdminService.editMembershipLevel with memberId', async () => {
            const responseValue = {
                code: 200,
                message: 'Success',
                data: 'data'
            };

            mockAdminService.editMembershipLevel = jest.fn(() => {
                return responseValue;
            });

            mockRequest = ({
                params: {
                    memberId,
                },
            });

            await adminController.editMembershipLevel(mockRequest, mockResponse);

            expect(mockAdminService.editMembershipLevel).toHaveBeenCalledWith(mockRequest.params.memberId);
            expect(mockResponse.status).toHaveBeenCalledWith(responseValue.code);
            expect(mockResponse.json).toHaveBeenCalledWith({message: responseValue.message, data: responseValue.data});
        });

    });

    describe('addGoods', () => {
        test('should call adminService.addGoods with the correct arguments', async () => {
            const mockAddGoodsRequest = {
                body: {
                    goodsName: 'Test Goods',
                    price: 100,
                    detail: 'Test detail',
                },
            };
            const mockAddGoodsResponse = {
                code: 200,
                message: 'Goods added successfully',
            };

            mockAdminService.addGoods = jest.fn(() => {
                return mockAddGoodsResponse;
            });

            const mockEmit = jest.fn();
            io.getIO = jest.fn(() => ({emit: mockEmit}));

            await adminController.addGoods(mockAddGoodsRequest, mockResponse);

            expect(mockAdminService.addGoods).toHaveBeenCalledWith(
                mockAddGoodsRequest.body.goodsName,
                mockAddGoodsRequest.body.price,
                mockAddGoodsRequest.body.detail,
                'this is photo'
            );
            expect(mockEmit).toHaveBeenCalledWith('addGoods', {goodsName: mockAddGoodsRequest.body.goodsName});
            expect(mockResponse.status).toHaveBeenCalledWith(mockAddGoodsResponse.code);
            expect(mockResponse.json).toHaveBeenCalledWith({message: mockAddGoodsResponse.message});
        });
    });

    describe('editGoods', () => {
        test('should call adminService.editGoods with the correct arguments', async () => {
            const mockEditGoodsResponse = {
                code: 200,
                message: 'Goods updated successfully',
            };
            const mockEditGoodsRequest = {
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
                return mockEditGoodsResponse;
            });

            await adminController.editGoods(mockEditGoodsRequest, mockResponse);

            expect(mockAdminService.editGoods).toHaveBeenCalledWith(
                mockEditGoodsRequest.params.goodsId,
                mockEditGoodsRequest.body.goodsName,
                mockEditGoodsRequest.body.price,
                mockEditGoodsRequest.body.detail,
                mockEditGoodsRequest.body.photo
            );
            expect(mockResponse.status).toHaveBeenCalledWith(mockEditGoodsResponse.code);
            expect(mockResponse.json).toHaveBeenCalledWith({message: mockEditGoodsResponse.message});
        });
    });

    describe('deleteGoods', () => {
        it('should call the adminService.deleteGoods method with the correct arguments and return a response with a status code of 200', async () => {
            const mockDeleteGoodsRequest = {
                params: {
                    goodsId: 'test-id',
                },
            };

            const mockDeleteGoodsResponse = {
                code: 200,
                message: 'Goods deleted successfully',
            };
            mockAdminService.deleteGoods = jest.fn(() => {
                return mockDeleteGoodsResponse;
            });

            await adminController.deleteGoods(mockDeleteGoodsRequest, mockResponse);

            expect(mockAdminService.deleteGoods).toHaveBeenCalledWith(mockDeleteGoodsRequest.params.goodsId);
            expect(mockResponse.status).toHaveBeenCalledWith(mockDeleteGoodsResponse.code);
            expect(mockResponse.json).toHaveBeenCalledWith({message: mockDeleteGoodsResponse.message});
        });
    })

    describe('completeOrder', () => {
        test('should call AdminService.completeOrder with orderId', async () => {
            const mockCompleteOrderResponse = {
                code: 200,
                message: 'Success',
            };

            const mockCompleteOrderRequest = {
                params: {
                    orderId: 1,
                },
            };

            mockAdminService.completeOrder = jest.fn(() => {
                return mockCompleteOrderResponse;
            });

            await adminController.completeOrder(mockCompleteOrderRequest, mockResponse);

            expect(mockAdminService.completeOrder).toHaveBeenCalledWith(mockCompleteOrderRequest.params.orderId);
            expect(mockResponse.status).toHaveBeenCalledWith(mockCompleteOrderResponse.code);
            expect(mockResponse.json).toHaveBeenCalledWith({message: mockCompleteOrderResponse.message});
        });
    });

    describe("addGoodsPage", () => {
        test("should render addGoods page with proper data", async () => {
            const mockAddGoodsPageRequest = {
                authInfo: {
                    level: 1
                }
            }

            await adminOutputController.addGoodsPage(mockAddGoodsPageRequest, mockResponse, next);

            expect(mockResponse.render).toHaveBeenCalledWith("addGoods", {
                loginId: true,
                title: "goods creating page",
            });
        });

        test("should return 400 if user does not have level 1 access", async () => {
            const mockAddGoodsPageRequest = {
                authInfo: {
                    level: 0
                }
            }

            await adminOutputController.addGoodsPage(mockAddGoodsPageRequest, mockResponse, next);

            expect(mockResponse.status).toHaveBeenCalledWith(400);
            expect(mockResponse.json).toHaveBeenCalledWith({
                message: "권한이 없습니다.",
            });
        });
    });

    describe('getAdminPage', () => {
        test('should render admin page with correct parameters', async () => {
            const mockGetAdminPageRequest = {
                authInfo: {
                    level: 1
                }
            }
            await adminOutputController.getAdminPage(mockGetAdminPageRequest, mockResponse, next);
            expect(mockResponse.render).toHaveBeenCalledWith('admin', {
                loginId: true,
                title: 'adminPage',
            });
        });

        test('should return 400 if user level is not 1', async () => {
            const mockGetAdminPageRequest = {
                authInfo: {
                    level: 0
                }
            }
            await adminOutputController.getAdminPage(mockGetAdminPageRequest, mockResponse, next);
            expect(mockResponse.status).toHaveBeenCalledWith(400);
            expect(mockResponse.json).toHaveBeenCalledWith({message: '권한이 없습니다.'});
        });
    });

    describe('getMemberList', () => {
        test('should render manage members page', async () => {
            const mockGetMemberListRequest = {
                authInfo: {
                    level: 1
                }
            }

            const mockGetMemberListResponse = {
                memberList: {
                    id: 1, name: 'John Doe'
                },
                code: 200
            }

            mockAdminService.getMemberList = jest.fn(() => {
                return mockGetMemberListResponse;
            });

            console.log('****', mockAdminService.getMemberList)

            await adminOutputController.getMemberList(mockGetMemberListRequest, mockResponse, next);

            expect(mockAdminService.getMemberList).toHaveBeenCalled()
            expect(mockResponse.status).toHaveBeenCalledWith(mockGetMemberListResponse.code);
            expect(mockResponse.render).toHaveBeenCalledWith('manageMembers', {
                data: mockGetMemberListResponse.memberList,
                loginId: true,
                title: 'manage members',
            });
        });

        test('should return error message if adminService returns an error', async () => {
            const mockGetMemberListRequest = {
                authInfo: {
                    level: 1
                }
            }

            const mockGetMemberListResponse = {
                code: 500,
                message: 'Server error'
            }

            mockAdminService.getMemberList = jest.fn(() => {
                return mockGetMemberListResponse;
            });

            await adminOutputController.getMemberList(mockGetMemberListRequest, mockResponse, next);
            expect(mockResponse.status).toHaveBeenCalledWith(mockGetMemberListResponse.code);
            expect(mockResponse.json).toHaveBeenCalledWith({message: mockGetMemberListResponse.message});
        });

        test('should return 400 if user level is not 1', async () => {
            const mockGetMemberListRequest = {
                authInfo: {
                    level: 0
                }
            }

            await adminOutputController.getMemberList(mockGetMemberListRequest, mockResponse, next);
            expect(mockResponse.status).toHaveBeenCalledWith(400);
            expect(mockResponse.json).toHaveBeenCalledWith({message: '권한이 없습니다.'});
        });
    });

    describe('getGoodsList', () => {
        it('should render the manageGoods page with goods data', async () => {
            const fakeGoodsData = [{id: 1, name: 'product 1', price: 100}, {
                id: 2,
                name: 'product 2',
                price: 200
            }, {id: 3, name: 'product 3', price: 300},];
            const response = {code: 200, data: fakeGoodsData};
            adminService.getGoodsList = jest.fn().mockResolvedValue(response);

            await adminOutputController.getGoodsList(req, res, next);

            expect(adminService.getGoodsList).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(response.code);
            expect(res.render).toHaveBeenCalledWith('manageGoods', {
                data: response.data,
                loginId: true,
                title: 'manage goods',
            });
        });

        it('should return an error message if there was a problem fetching goods data', async () => {
            const fakeErrorMessage = 'Error fetching goods data';
            const response = {code: 500, message: fakeErrorMessage};
            adminService.getGoodsList = jest.fn().mockResolvedValue(response);

            await adminOutputController.getGoodsList(req, res, next);

            expect(adminService.getGoodsList).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(response.code);
            expect(res.json).toHaveBeenCalledWith({message: response.message});
        });
    });

    describe('getOrderList', () => {
        it('should render the manageOrders page with order data', async () => {
            const fakeOrderData = [{id: 1, user: 'user1', date: '2022-02-01'}, {
                id: 2,
                user: 'user2',
                date: '2022-02-02'
            }, {id: 3, user: 'user3', date: '2022-02-03'},];
            const response = {code: 200, data: fakeOrderData};
            adminService.getOrderList = jest.fn().mockResolvedValue(response);

            await adminOutputController.getOrderList(req, res, next);

            expect(adminService.getOrderList).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(response.code);
            expect(res.render).toHaveBeenCalledWith('manageOrders', {
                data: response.data,
                loginId: true,
                title: 'manage orders',
            });
        });

        it('should return an error message if there was a problem fetching order data', async () => {
            const fakeErrorMessage = 'Error fetching order data';
            const response = {code: 500, message: fakeErrorMessage};
            adminService.getOrderList = jest.fn().mockResolvedValue(response);

            await adminOutputController.getOrderList(req, res, next);

            expect(adminService.getOrderList).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(response.code);
            expect(res.json).toHaveBeenCalledWith({message: response.message});
        });
    });

    describe("editGoodsPage", () => {
        test("should render editGoods page with proper data", async () => {
            req.authInfo = {level: 1};
            req.params = {goodsId: 1};

            const response = {
                code: 200,
                data: {name: "test goods"},
            };
            jest
                .spyOn(adminService, "getOneGoods")
                .mockImplementation(() => Promise.resolve(response));

            await adminOutputController.editGoodsPage(req, res, next);

            expect(res.render).toHaveBeenCalledWith("editGoods", {
                data: response.data,
                loginId: true,
                title: "goods editing page",
            });
        });

        test("should return 400 if user does not have level 1 access", async () => {
            req.authInfo = {level: 1};
            req.params = {goodsId: 0};

            await adminOutputController.editGoodsPage(req, res, next);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                message: "권한이 없습니다.",
            });
        });
    });
})
