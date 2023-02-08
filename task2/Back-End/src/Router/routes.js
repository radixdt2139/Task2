const express = require("express");
const User = require("../schemas/UserModal");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const app = express();
app.post("/add-user", async (request, response) => {
  const {
    email,
    picture,
    family_name,
    given_name,
    name,
    verified_email,
    password,
  } = request.body;
  // const users = await userModel.find({});

  const findDuplicateUser = await User.find({ email: email });
  console.log(findDuplicateUser, "findDuplicateUser");
  if (findDuplicateUser.length !== 0) {
    return response.status(409).send("User already exists");
  }
  if (
    !(email, picture, family_name, given_name, name, verified_email, password)
  ) {
    return res.status(400).send("All input is required");
  }

  const encryptedPassword = await bcrypt.hash(password, 10);
  console.log("called");
  try {
    // const user = new userModel({
    //   email,
    //   picture,
    //   family_name,
    //   given_name,
    //   name,
    //   verified_email,
    //   password: encryptedPassword,
    // });
    await User.create({
      email,
      picture,
      family_name,
      given_name,
      name,
      verified_email,
      password: encryptedPassword,
    });

    response.send({
      email: email,
      picture,
      family_name,
      given_name,
      name,
      verified_email,
      password: encryptedPassword,
    });
  } catch (error) {
    console.log(error, error.message);
    return response.status(500).send(error);
  }
});
app.get("/users", async (request, response) => {
  const users = await User.find({});

  try {
    response.send(users);
  } catch (error) {
    response.status(500).send(error);
  }
});
app.post("/login", async (req, res) => {
  // Our login logic starts here
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      return res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await User.findOne({ email });
    console.log(user, "USER");
    if (!user) {
      console.log(user, "from");
      return res
        .status(401)
        .send("Email not found.Please register with google first!!!!");
    }
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send("Email or password is incorrect!!!!!");
    }
    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      //need to refactor
      const token = jwt.sign({ user_id: user._id, email }, "anuj_secret", {
        expiresIn: "2h",
      });

      // save user token
      user.token = token;

      // user
      return res.status(200).json({ token: token });
    }
  } catch (err) {
    console.log(err);
  }
  // Our register logic ends here
});

module.exports = app;
