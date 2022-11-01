import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.js";
const secret = "test";

export const register = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  try {
    // check if user exists
    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // create new user
    const newUser = await User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });

    // generate token
    const token = jwt.sign({ email: newUser.email, id: newUser._id }, secret, {
      expiresIn: "1hr",
    });

    res.status(201).json({ user: newUser, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    // check password
    const passwordCorrect = await bcrypt.compare(password, user.password);
    if (!passwordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    // create token
    const token = jwt.sign({ email: user.email, id: user.id }, secret, {
      expiresIn: "1hr",
    });

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};
