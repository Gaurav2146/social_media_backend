const UserService = require('./userService');

jest.setTimeout(10000);
describe('Upload Service', () => {
  let userService;
  beforeEach(() => {
    userService = new UserService();
  });

  it('save user', async () => {
    const addFileSpy = jest.spyOn(userService, 'register').mockResolvedValueOnce('save-user');
    const Obj = await userService.register({});
    expect(addFileSpy).toHaveBeenCalledWith({});
    expect(Obj).toBe('save-user');
  });
});
