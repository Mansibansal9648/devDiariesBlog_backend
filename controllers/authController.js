import { loginUser, signUpUser } from "../repository/authRepository.js";
import bcrypt from "bcrypt";
import {
  apiResponseSuccess,
  apiResponseErr,
} from "../middlewares/apiResponse.js";

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
    data.username = data.username.toLowerCase();
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
    loginUser();
  } catch (error) {}
};
export { signUp, login };
