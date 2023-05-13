const { UserModel } = require("../model/userModel");
const jwt = require("jsonwebtoken");
const bcypt = require("bcrypt");
require("dotenv").config()

const signup = async (req, res) => {
  const { username, password } = req.body;
  try {
    let user = await UserModel.find({ username });
    if (!user.length) {
      bcypt.hash(password, +process.env.salt, async (err, hash) => {
        if (err) {
          res.status(200).json({ message: "Something went wrong.", error: err.message });
        } else {
          try {
            let newUser = UserModel({ username, password: hash });
            await newUser.save();
            res.status(200).json({ message: "signup successful" });
          } catch (err) {
            res.status(200).json({ message: "user already exist.", error: err.message });
          }
        }
      });
    } else {
      res.status(200).json({ message: "user already exist." });
    }
  } catch (err) {
    res
      .status(403)
      .json({ message: "something went wrong.", error: err.message });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    let user = await UserModel.find({ username });
    if (user.length) {
      bcypt.compare(password, user[0].password, (err, result) => {
        if (err) {
          res.status(200).json({ message: "something went wrong.", error: err.message });
        } else {
          if (result) {
            let token = jwt.sign(
              {
                userId: user[0]._id
              },
              process.env.secretKey,
              { expiresIn: "2h" }
            );
            res.status(200).json({ message: "login successful", user:{token,name:user[0].username}})
          }
          else {
            res.status(200).json({ message: "wrong password" })
          }
        }
      });
    }
    else {
      res.status(200).json({ message: "user not found" })
    }
  } catch (err) {
    res
      .status(200)
      .json({ message: "something went wrong.", error: err.message });
  }
};


module.exports = { signup, login }