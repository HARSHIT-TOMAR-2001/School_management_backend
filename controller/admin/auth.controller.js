require('dotenv').config();

const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Admin = require('../../models/admin.model');

const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const result = await Admin.findOne({ email });

    if (result) {
      return res.status(400).send({ msg: 'Admin already exist with this email' });
    } else {
      const encryptedPassword = await bcrypt.hash(password, 10);
      const newAdmin = new Admin({
        name,
        email,
        password: encryptedPassword,
      });
      await newAdmin.save();

      res.status(200).send({ success: true, msg: 'Admin succesfully registered' });
    }
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};

const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await Admin.findOne({ email });
    if (result === null) {
      return res.status(400).send({ message: 'invalid email' });
    } else {
      const encryptedPassword = bcrypt.compare(password, result.password);
      if (!encryptedPassword) return res.status(400).send({ message: 'wrong password' });
      const token = jwt.sign(
        {
          name: result.name,
          email: result.email,
        },
        process.env.TOKEN_KEY,
        {
          expiresIn: '2h',
        },
      );
      const updatedAdmin = await Admin.findByIdAndUpdate(result.id, {
        authToken: token,
      });
      res
        .status(200)
        .send({ success: true, admin_name: updatedAdmin.name, token: updatedAdmin.authToken });
    }
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};

module.exports = {
  signup,
  signin,
};
