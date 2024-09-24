import { Category } from "../schemas/categorySchema.js";

const getCategory = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const allCategories = await Category.find();
        resolve(allCategories);
      } catch (error) {
        reject(error);
      }
    });
  };

  export {getCategory}