import { loginUser, signUpUser } from "../repository/authRepository.js";
import bcrypt from "bcrypt";
import {
  apiResponseSuccess,
  apiResponseErr,
} from "../middlewares/apiResponse.js";
import jwt from 'jsonwebtoken'

const signUp = async (req, res) => {
  try {
    //  console.log(req.body);
    let data = req.body;

    if (!data.username) {
      throw new Error("Username is required field");
    }

    if (!data.name) {
      // return res.status(400).send({message:"Name is required field"})
      throw new Error("Name is required field");
    }

    if (!data.email) {
      throw new Error("Email is required field");
    }

    if (!data.password) {
      throw new Error("Password is required field");
    }
    let password = data.password;

    // console.log(process.env.JWT_SECRET_KEY);

    const passwordSalt = await bcrypt.genSalt();

    let hashedPassword = await bcrypt.hash(password, passwordSalt);
    data.password = hashedPassword;
    // console.log(hashedPassword);
    data.email = data.email.toLowerCase();
    // email.toLowerCase();
    // console.log(email);
    let email= data.email.split('@')[0].replaceAll(".", "");
    data.email=email+'@'+data.email.split('@')[1];
    // console.log("email",data.email)
    // let username = "";
    // for (let i = 0; i < email.length; i++) {
    //   if (email.charAt(i) == "@") {
    //     break;
    //   }
    //   username += email.charAt(i);
    // }
    // console.log(username);
    // data.username = username;
    //  console.log("data",data)
    const result = await signUpUser(data);
    return res.status(201).send(
      apiResponseSuccess({}, true, 201, "User created successfully")
    );
  } catch (error) {
    return res.status(400).send(apiResponseErr(null, false, 400, error.message));
  }
};

const login = async (req, res) => {
  try {
let data =req.body;
if(!data.username_email){
  throw new Error("Email or Username is required field")
}
if(!data.password){
  throw new Error("Password is required field")
}

let isEmail=/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.username_email)
if(isEmail){
  data.username_email=data.username_email.toLowerCase();
  let email= data.username_email.split('@')[0].replaceAll(".", "");
  data.username_email=email+'@'+data.username_email.split('@')[1];
}
let response=await loginUser(data);
// console.log("res",response)
if (response) {
  const isPasswordValid = await bcrypt.compare(
    data.password,
    response.password
  );
  // console.log("password", isPasswordValid);
  if (!isPasswordValid) {
    throw new Error("Invalid credentials");
  }
}
    let accessTokenResponse = {
      id: response._id,
      username: response.username,
      email: response.email,
      name:response.name
    };
    const accessToken = jwt.sign(accessTokenResponse, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.ACCESS_TOKEN_VALIDITY,
    });
let result={
  id: response._id,
  username: response.username,
  email: response.email,
  isLogin:true,
  accessToken:accessToken
}
// console.log(result)
return res.status(200).send(
  apiResponseSuccess(result, true, 200, "User loggedIn successfully")
); 
  } catch (error) {
    return res.status(400).send(apiResponseErr(null, false, 400, error.message));
  }
};
export { signUp, login };
