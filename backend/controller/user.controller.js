import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import JWT from "jsonwebtoken";

// Register Controller
export const registerController = async (req, res) => {
  try {
    const { username, email, password, dob } = req.body;
    // console.log(req.body);
    

    // Validations
    if (!username) return res.status(400).send({ error: "Name is Required" });
    if (!email) return res.status(400).send({ error: "Email is Required" });
    if (!password) return res.status(400).send({ error: "Password is Required" });
    if (!dob) return res.status(400).send({ error: "Date of Birth is Required" });

    // Check existing user
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).send({
        success: false,
        message: "Already registered, please login",
      });
    }

    // Register user
    const hashedPassword = await hashPassword(password);
    const user = new userModel({ username, email, password: hashedPassword, dob });
    await user.save();
    
    
    res.status(201).send({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in registration",
      error,
    });
  }
};

// Login Controller
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    

    // Validations
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Email and password are required",
      });
    }

    // Check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registered",
      });
    }

    // Check password
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(401).send({
        success: false,
        message: "Invalid password",
      });
    }

    // Generate token
    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET || "defaultsecret", {
      expiresIn: "1d",
    });

    res.status(200).send({
      success: true,
      message: "Login successfully",
      user: {
        _id: user._id,
        name: user.username,
        email: user.email,
        dob: user.dob,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};



export const getAllUsers = async (req, res) => {
    try {
      const users = await userModel.find({}); // Exclude the password field
      if(!users){
        return res.send("error in users found");
      }

          res.send(users);
      console.log(users)
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };