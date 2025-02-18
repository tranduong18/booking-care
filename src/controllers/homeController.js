const db = require("../models/index");

module.exports.getHomePage = async (req, res) => {
  try {
    const data = await db.User.findAll();

    return res.render('homepage.ejs', {
      data: JSON.stringify(data)
    });
  } catch (error) {
    console.log(error);
  }
}

module.exports.getAboutPage = (req, res) => {
  return res.render('test/about.ejs');
}