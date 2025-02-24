const db = require("../models/index");
const CRUDService = require("../services/CRUDService");

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

module.exports.getCRUD = (req, res) => {
  return res.render('crud.ejs');
}

module.exports.postCRUD = async (req, res) => {
  const user = await CRUDService.createNewUser(req.body);
  return res.send("Ok create user successfully");
}

module.exports.displayGetCRUD = async (req, res) => {
  const users = await CRUDService.getAllUser();

  return res.render("displayCRUD.ejs", {
    users: users
  });
}

module.exports.getEditCRUD = async (req, res) => {
  const userId = req.query.id;

  if(userId){
    const userData = await CRUDService.getUserInfoById(userId);


    return res.render("editCRUD.ejs", {
      user: userData
    });
  }
  else{
    return res.send("User not found");
  }
}

module.exports.putCRUD = async (req, res) => {
  const data = req.body;
  await CRUDService.updateUserData(data);
  return res.redirect("/get-crud");
}

module.exports.deleteCRUD = async (req, res) => {
  const id = req.query.id;
  if(id){
    await CRUDService.deleteUserById(id);
    return res.send("delete user ok");
  }
  else{
    return res.send("user not found");
  }
}