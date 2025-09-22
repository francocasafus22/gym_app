import User from "../models/User.js";

export default class UserController {
  static async getAll(req, res) {
    const users = await User.find();
    res.json(users);
  }
}
