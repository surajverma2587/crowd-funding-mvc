const renderLoginPage = (req, res) => {
  console.log(req.session);
  return res.send("renderLoginPage");
};
const renderSignupPage = (req, res) => {
  return res.send("renderSignupPage");
};
const renderHomePage = (req, res) => {
  return res.send("renderHomePage");
};

module.exports = { renderLoginPage, renderSignupPage, renderHomePage };
