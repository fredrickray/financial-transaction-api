import AuthService from "./auth-service.js";

export class AuthController {
  constructor() {
    this.authService = AuthService;
  }

  /**
   * @route POST api/auth/signin
   * @desc Login a user
   * @access Public
   */
  async signin(req, res, next) {
    await this.authService.signin(req, res, next);
  }
}
