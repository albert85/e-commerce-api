const knex = require("../../db");
const bcrypt = require('bcryptjs');
const { generateToken } = require("../../helpers/util");

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
  
    const userInfo = await knex("user")
      .where({
        email,
      })
      .first();
  
    const checkPassword = await bcrypt.compare(password, userInfo.password);
  
    if (!userInfo || !checkPassword) {
      return res.status(404).json({
        message: "User not found, please check the credential supplied",
        success: false,
      });
    }
  
    const token = generateToken({
      id: userInfo.id,
      role: userInfo.role,
      email: userInfo.email
    })
  
    return res.status(201).json({
      message: "User successfully login",
      success: true,
      data: {
        id: userInfo.id,
        name: userInfo.name,
        email: userInfo.email,
        role: userInfo.role,
        createdAt: userInfo.createdAt,
        updatedAt: userInfo.updatedAt,
      },
      token
    });
  } catch (error) {
    return res.status(400).json({
      message: "Logining was not successful success",
      success: false,
      error
    });
  }
}

module.exports = {
  loginUser,
};
