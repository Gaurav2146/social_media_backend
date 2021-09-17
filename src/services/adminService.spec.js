const AdminService = require('./userService');

jest.setTimeout(10000);
describe('Upload Service', () => {
  let adminService;
  beforeEach(() => {
    adminService = new AdminService();
  });

  it('save user', async () => {
    const addFileSpy = jest.spyOn(adminService, 'register').mockResolvedValueOnce('save-user');
    const Obj = await adminService.register({});
    expect(addFileSpy).toHaveBeenCalledWith({});
    expect(Obj).toBe('save-user');
  });
});
