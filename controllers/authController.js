import { loginUser, signUpUser } from "../repository/authRepository.js";
import bcrypt from "bcrypt";
const signUp = async (req, res) => {
  try {
    // console.log(req.body);
    let data = req.body;

    if(!data.username){
      // return res.status(400).send({message:"Name is required field"})
      throw new Error("Username is required field");
    }

    if(!data.name){
      // return res.status(400).send({message:"Name is required field"})
      throw new Error("Name is required field");
    }
    if(!data.email){
      throw new Error("Email is required field")
    }
    if(!data.password){
      throw new Error("Password is required field")
    }
    let password = data.password;

    // console.log(process.env.JWT_SECRET_KEY);

    const passwordSalt = await bcrypt.genSalt();

    let hashedPassword = await bcrypt.hash(
      password,
      passwordSalt
    );
    data.password = hashedPassword;
    // console.log(hashedPassword);
    data.email = data.email.replace('.','')
    
    const result = await signUpUser(data);
    return res.status(201).send(result);
  } catch (error) {
    return res.send({error : error.message});
  }
};

const login = async (req, res) => {
  try {
    loginUser();
  } catch (error) {}
};
export { signUp, login };
