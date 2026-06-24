import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import config from "../config/config.js"
import blackListTokenModel from "../models/tokenBlacklisting.model.js";



/**
 *  Register a new user
 * 
 * Expects :
 * req.body={
 *   username: "string",
 *  email: "string",
 *  password: "string"
 * }
 * 
 * Sucess Response(201):
 * {
 *  message: "User registered successfully",
 *  id: "string",
 *  username: "string",
 *  email: "string",
 * accessToken: "string"
 * }
 * 
 * Error Response:
 * {
 * -400: "Username or email or password is missing",
 * -400: "User already exist with this email or username",
 * -500: "Internal server error"
 * }
 * 
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @returns {Promise<void>}
 */
export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({
        message: "Username or email or password is missing"
      });
    }
    const isUserAlreadyExist = await userModel.findOne({
      $or: [
        { email },
        { username }
      ]
    })
    if (isUserAlreadyExist) {
      return res.status(400).json({
        message: "User already exist with this email or username"
      })
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({
      username,
      email,
      password: hashedPassword
    })

    const accessToken = jwt.sign({
      id: user._id,
      username: user.username,
    }, config.JWT_SECRET, {
      expiresIn: "15m"
    })
    const refreshToken = jwt.sign({
      id: user._id,
      username: user.username,
    }, config.JWT_SECRET, {
      expiresIn: "7d"
    })
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000  // in milliseconds
    })

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id,
        username,
        email
      },
      accessToken
    })

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error"
    })
  }
}

/**
 * Expects:
 * 
 * req.body:{
 *  email:String,
 *  password:String
 * }
 * 
 * Success Response(201):
 * {
 *  message:"user loggedIn successfully ",
 *  user:{
 *  id:String,
 *  username:String,
 *  email :String,
 *  accessToken:String,
 *  }
 * }
 * 
 * Error Responses:
 * {
 * -400 : Email or password is missing , 
 * -500 : Internal Server Eroor 
 * }
 * 
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @returns {Promise<void>}
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Email or password is missing"
      })
    }
    const user = await userModel.findOne({
      email
    })
    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password"
      })
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Invalid email or password"
      })
    }
    const accessToken = jwt.sign({
      id: user._id,
      username: user.username,
    }, config.JWT_SECRET, {
      expiresIn: "15m"
    })
    const refreshToken = jwt.sign({
      id: user._id,
      username: user.username,
    }, config.JWT_SECRET, {
      expiresIn: "7d"
    })
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000 // in milliseconds 
    })
    return res.status(200).json({
      message: "User loggedIn successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        accessToken
      }
    })
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Errror"
    })
  }
}
/**
 * Expects:{
 * refreshToken : String (from cookies)
 * }
 * Success response(200):
 * {
 * message:"Access token generated successfully",
 * }
 * Error Responses:{
 * -400: "Refresh Token not found",
 * -401: "Invalid refresh token",
 * -401: "Invalid or expired  refresh token  "
 * }
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @returns {Promise<void>}
 */
export const refreshController = async (req, res) => {
  try {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) {
      return res.status(400).json({
        message: "Refresh Token not found "
      })
    }
    const isBlackListed = await blackListTokenModel.findOne({
      token: refreshToken
    })
    if (isBlackListed) {
      return res.status(401).json({
        message: "Invalid refresh token"
      })
    }
    const decoded = jwt.verify(refreshToken, config.JWT_SECRET);
    const newAccessToken = jwt.sign({
      id: decoded.id,
      username: decoded.username
    }, config.JWT_SECRET, {
      expiresIn: "15m"
    })
    const newRefreshToken = jwt.sign({
      id: decoded.id,
      username: decoded.username
    }, config.JWT_SECRET, {
      expiresIn: "7d"
    })
    res.cookie("refreshToken", newRefreshToken, {
      sameSite: "strict",
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000
    })
    return res.status(200).json({
      accessToken: newAccessToken,
    })
  }
  catch (error) {
    return res.status(401).json({
      message: "Invalid or expired  refresh token  "
    })
  }
}

/**
 * Expects:{
 * refreshToken : String (from cookies)
 * }
 * Success response(200):
 * {
 * message:"Logged out successfully",
 * }
 * Error Responses:{
 * -400: "Refresh Token not found",   
 * -500: "Internal Server Error"
 * }
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @returns {Promise<void>}
 */
export const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) {
      return res.status(400).json({
        message: "Refresh Token not found "
      })
    }
    const decoded = jwt.verify(refreshToken, config.JWT_SECRET);
    await blackListTokenModel.create({
      token: refreshToken,
      expiresAt: new Date(decoded.exp * 1000) // convert to milliseconds
    })
    res.clearCookie("refreshToken", {
      httpOnly: true,
      sameSite: "strict",
    })


    return res.status(200).json({
      message: "Logged out successfully"
    })
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error"
    })
  }
}

export const getUserDetails = async (req, res) => {
  try {
    const user = await userModel.findOne({
      _id: req.user.id
    }); // set in auth middleware

    return res.status(200).json({
      user
    })
  }
  catch (error) {
    return res.status(500).json({
      message: "Internal Server Error"
    })
  }
}