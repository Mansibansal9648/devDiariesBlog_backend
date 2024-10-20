import {
  forgotUserPassword,
  getUserByEmail,
  getUserById,
  loginUser,
  resetUserPassword,
  signUpUser,
} from "../repository/authRepository.js";
import bcrypt from "bcrypt";
import {
  apiResponseSuccess,
  apiResponseErr,
} from "../middlewares/apiResponse.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import emailTemplate from "../utils/emailTemplate.js";

const signUp = async (req, res) => {
  try {
    let data = req.body;
    let password = data.password;

    const passwordSalt = await bcrypt.genSalt();

    let hashedPassword = await bcrypt.hash(password, passwordSalt);
    data.password = hashedPassword;

    data.username = data.username.toLowerCase();
    data.email = data.email.toLowerCase();

    let email = data.email.split("@")[0].replaceAll(".", "");
    data.email = email + "@" + data.email.split("@")[1];
    let response = await signUpUser(data);
    let accessTokenResponse = {
      id: response._id,
      username: response.username,
      email: response.email,
      name: response.name,
    };
    const accessToken = jwt.sign(
      accessTokenResponse,
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: process.env.ACCESS_TOKEN_VALIDITY,
      }
    );
    let result = {
      id: response._id,
      name: response.name,
      username: response.username,
      email: response.email,
      isLogin: true,
      accessToken: accessToken,
    };
    // const result = await signUpUser(data);
    return apiResponseSuccess(result, true, 201, "User created successfully", res);
  } catch (error) {
    return apiResponseErr(null, false, 400, error.message, res);
  }
};

const login = async (req, res) => {
  try {
    let data = req.body;
    data.username_email = data.username_email.toLowerCase();

    let isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.username_email);
    if (isEmail) {
      let email = data.username_email.split("@")[0].replaceAll(".", "");
      data.username_email = email + "@" + data.username_email.split("@")[1];
    }
    let response = await loginUser(data);
    if (response) {
      const isPasswordValid = await bcrypt.compare(
        data.password,
        response.password
      );
      if (!isPasswordValid) {
        throw new Error("Invalid credentials");
      }
    }
    let accessTokenResponse = {
      id: response._id,
      username: response.username,
      email: response.email,
      name: response.name,
    };
    const accessToken = jwt.sign(
      accessTokenResponse,
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: process.env.ACCESS_TOKEN_VALIDITY,
      }
    );
    let result = {
      id: response._id,
      name: response.name,
      username: response.username,
      email: response.email,
      isLogin: true,
      accessToken: accessToken,
    };
    return apiResponseSuccess(
      result,
      true,
      200,
      "User loggedIn successfully",
      res
    );
  } catch (error) {
    return apiResponseErr(null, false, 400, error.message, res);
  }
};

const forgotPassword = async (req, res) => {
  try {
    let data = req.body;
    data.email = data.email.toLowerCase();
    let email = data.email.split("@")[0].replaceAll(".", "");
    data.email = email + "@" + data.email.split("@")[1];
    let result = await getUserByEmail(data);
    let accessTokenResponse = {
      id: result._id,
    };
    const accessToken = jwt.sign(
      accessTokenResponse,
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: process.env.PASSWORD_RESET_ACCESS_TOKEN_VALIDITY,
      }
    );
    const resetPassRes = await forgotUserPassword(result.email, accessToken);

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER_NAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const resetLink = `http://localhost:3000/reset-password/${accessToken}`;
    const mailOptions = {
      to: resetPassRes.email,
      from: `"DevDiaries" <${process.env.EMAIL_USER_NAME}>`,
      subject: "[DevDiaries] Password Reset",
      html: emailTemplate(resetPassRes.username, resetLink),
    };

    const emailRes = await transporter.sendMail(mailOptions);
    // console.log(emailRes)
    return apiResponseSuccess(
      {},
      true,
      200,
      "Password reset email sent successfully",
      res
    );
  } catch (error) {
    return apiResponseErr(null, false, 400, error.message, res);
  }
};

const resetPassword = async (req, res) => {
  try {
    const data = req.body;
    const accessToken = req.query.accessToken;

    const decodedUser = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
    // console.log(decodedUser)
    const userRes = await getUserById(decodedUser);

    const passwordSalt = await bcrypt.genSalt();

    let hashedPassword = await bcrypt.hash(data.newPassword, passwordSalt);
    // data.newPassword = hashedPassword;
    const result = await resetUserPassword(
      userRes,
      accessToken,
      hashedPassword
    );

    return apiResponseSuccess(
      {},
      true,
      200,
      "Password reset successfully",
      res
    );
  } catch (error) {
    // console.log(error)
    if (error.name === "TokenExpiredError") {
      return apiResponseErr(null, false, 400, "Token is expired", res);
    }
    if (error.name === "JsonWebTokenError") {
      return apiResponseErr(null, false, 400, "Token is invalid", res);
    }
    return apiResponseErr(null, false, 400, error.message, res);
  }
};

export { signUp, login, forgotPassword, resetPassword };
