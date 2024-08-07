import { loginUser, signUpUser } from "../repository/authRepository.js";
import bcrypt from "bcrypt";
import {
  apiResponseSuccess,
  apiResponseErr,
} from "../middlewares/apiResponse.js";
import jwt from "jsonwebtoken";

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
    const result = await signUpUser(data);
    return apiResponseSuccess({}, true, 201, "User created successfully", res)
  } catch (error) {
    return apiResponseErr(null, false, 400, error.message, res)
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
    return apiResponseSuccess(result, true, 200, "User loggedIn successfully", res)
  } catch (error) {
    return apiResponseErr(null, false, 400, error.message, res)
  }
};
export { signUp, login };
