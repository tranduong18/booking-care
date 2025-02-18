const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('hoidanit', 'root', null, {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Kết nối database thành công");
  } catch (error) {
    console.log("Kết nối database thất bại");
  }
}

module.exports = connectDB;