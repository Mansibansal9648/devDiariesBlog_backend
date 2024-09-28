import { getCategory } from "../repository/categoryRepository.js";
import { apiResponseErr,apiResponseSuccess } from "../middlewares/apiResponse.js";

const getAllCategories=async(req,res)=>{
    try {
        const result = await getCategory();
        return apiResponseSuccess(result, true, 200, "Retrieved all categories successfully", res)
      } catch (error) {
        return apiResponseErr(null, false, 400, error.message, res)
      }
}

export {getAllCategories}