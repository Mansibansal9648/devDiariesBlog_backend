import { User } from "../schemas/signupSchema.js";

const loginUser = (data) => {};

const signUpUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const existedUser = await User.findOne({
        $or: [{ username: data.username }, { email: data.email }],
      });
      // const existedEmail = await User.findOne({username: data.username});
      // console.log(existedUser);
      if (existedUser) {
        throw new Error("User Already Exists");
      } else {
        const user = new User(data);
        //  const newUser=await User.insert(req)
        const newUser = await user.save();
        resolve(newUser);
      }
    } catch (error) {
      reject(error);
    }
  });
};

export { loginUser, signUpUser };
