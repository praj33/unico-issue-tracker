const usersService = require('../services/users.service');
const { createUserSchema } = require('../validators/users.validator');

const createUser = async (req, res, next) => {
  try {
    const validatedData = createUserSchema.parse(req.body);
    const user = await usersService.createUser(validatedData);
    res.status(201).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const users = await usersService.getAllUsers();
    res.json({ success: true, data: users });
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const user = await usersService.getUserById(req.params.id);

    if (!user) {
      const err = new Error('User not found');
      err.statusCode = 404;
      throw err;
    }

    res.json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById
};