const { User } = require("../../models");

const login = async (req, res) => {
  try {
    // get the user data from payload
    const { email, password } = req.body;

    // get user by email address
    const user = await User.findOne({ where: { email } });

    if (!user) {
      console.log(
        `[ERROR]: Failed to login | No user with email address of ${email}`
      );

      return res.status(401).json({ error: "Failed to login" });
    }

    const isAuthorised = await user.checkPassword(password);

    if (isAuthorised) {
      req.session.save(() => {
        req.session.isLoggedIn = true;
        req.session.user = user.getUser();
        return res.json({ data: "successfully logged in" });
      });
    } else {
      return res.status(401).json({ error: "failed to login" });
    }
  } catch (error) {
    console.log(`[ERROR]: Failed to login | ${error.message}`);

    return res.status(500).json({ error: "Failed to login" });
  }
};

const signup = async (req, res) => {
  try {
    // get the user data from payload
    const { firstName, lastName, email, password } = req.body;

    // check if user exists
    const user = await User.findOne({ where: { email } });

    if (user) {
      console.log(
        `[ERROR]: Failed to create user | Email address of ${email} already exists`
      );

      return res.status(400).json({ error: "Failed to create user" });
    }

    // create user
    const data = await User.create({
      firstName,
      lastName,
      email,
      password,
    });

    return res.json({ data: "successfully created user" });
  } catch (error) {
    console.log(`[ERROR]: Failed to create user | ${error.message}`);

    return res.status(500).json({ error: "Failed to create user" });
  }
};

const logout = (req, res) => {
  // if logged in destroy session
};

module.exports = {
  login,
  signup,
  logout,
};
