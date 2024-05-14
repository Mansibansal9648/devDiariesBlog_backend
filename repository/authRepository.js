import { User } from "../schemas/signupSchema.js";

const loginUser = (data) => {};

const signUpUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      // console.log("vgfhh", data);
      const existedUser = await User.findOne({
        $or: [{ username: data.username }, { email: data.email }],
      });
      // const existedEmail = await User.findOne({username: data.username});
      // console.log(existedUser);
      if (
        existedUser &&
        existedUser.username === data.username &&
        existedUser.email === data.email
      ) {
        throw new Error("Username and Email Already Exists");
      } else if (existedUser && existedUser.username === data.username) {
        throw new Error("Username Already Exists");
      } else if (existedUser && existedUser.email === data.email) {
        throw new Error("Email Already Exists");
      } else {
        // console.log("yttyu", data);
        const user = new User(data);
        //  const newUser=await User.insert(req)
        // console.log(user);
        const newUser = await user.save();
        // console.log(newUser);
        resolve(newUser);
      }
    } catch (error) {
      reject(error);
    }
  });
};

export { loginUser, signUpUser };
