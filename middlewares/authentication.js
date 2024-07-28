import jwt from "jsonwebtoken";
import {
  apiResponseSuccess,
  apiResponseErr,
} from "../middlewares/apiResponse.js";

const authenticateToken = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    // console.log(authHeader);
    const token = authHeader && authHeader.split(" ")[1];

    // console.log(token);
    if (!token) {
      return apiResponseErr(null, false, 401,"Token not found" , res);
    }

    const result = verifyAccessToken(token);
    // console.log(result);
    if (!result.success) {
      return apiResponseErr(null, false, 401, "You are not authorized - Unauthorized Access", res);
    }

    req.user = result.data;
  } catch (error) {
    return apiResponseErr(null, false, 400, error.message, res);
  }
  next();
};

function verifyAccessToken(token) {
  const secretKey = process.env.JWT_SECRET_KEY;

  try {
    const decoded = jwt.verify(token, secretKey);
    return { success: true, data: decoded };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export { authenticateToken };
