import { User } from "../schemas/signupSchema.js";

const loginUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const existUser = await User.findOne({
        $or: [
          { username: data.username_email },
          { email: data.username_email },
        ],
      });
      if (existUser) {
        resolve(existUser);
      } else {
        throw new Error("User doesn't exist");
      }
    } catch (error) {
      reject(error);
    }
  });
};

const signUpUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const existedUser = await User.findOne({
        $or: [{ username: data.username }, { email: data.email }],
      });

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
        const user = new User(data);
        const newUser = await user.save();
        resolve(newUser);
      }
    } catch (error) {
      reject(error);
    }
  });
};

export { loginUser, signUpUser };
