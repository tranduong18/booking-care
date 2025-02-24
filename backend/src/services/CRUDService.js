const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

const db = require('../models/index');

const hashUserPassword = async (password) => {
  try {
    const hashPassword = await bcrypt.hash(password, salt);
    return hashPassword;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

module.exports.createNewUser = async(data) => {
  try {
    const hashPasswordFromBcrypt = await hashUserPassword(data.password);

    const user = await db.User.create({
      email: data.email,
      password: hashPasswordFromBcrypt,
      firstName: data.firstName,
      lastName: data.lastName,
      address: data.address,
      phoneNumber: data.phoneNumber,
      gender: data.gender === '1',
      roleId: data.roleId
    })

    return user;
  } catch (error) {
    console.log(error);
    throw(error);
  }
}

module.exports.getAllUser = async() => {
  try {
    const users = await db.User.findAll({
      raw: true
    });
    return users;
  } catch (error) {
    console.log(error);
    throw(error);
  }
}

module.exports.getUserInfoById = async (userId) => {
  try {
    const user = await db.User.findOne({
      where: {
        id: userId
      }, 
      raw: true
    })

    if(user){
      return user;
    }
    else{
      return {};
    }
  } catch (error) {
    console.log(error);
    throw(error);
  }
}

module.exports.updateUserData = async(data) => {
  try {
    const user = await db.User.findOne({
      where: { id: data.id }
    });

    if(user){
      user.firstName = data.firstName;
      user.lastName = data.lastName;
      user.address = data.address;

      await user.save();
      
      return user;
    }
    else{
      return null;
    }
  } catch (error) {
    console.log("Lỗi update user:", error);
    throw(error);
  }
}

module.exports.deleteUserById = async (userId) => {
  try {
    const user = await db.User.findOne({
      where: {
        id: userId
      }
    })

    if(user){
      await user.destroy();
    }

    return;
  } catch (error) {
    console.log(error);
    throw(error);
  }
}