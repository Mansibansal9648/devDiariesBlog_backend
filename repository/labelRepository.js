import { Label } from "../schemas/labelSchema.js";

const createNewLabel = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const existedLabel = await Label.findOne({
        name: data.name,
      });
      //   console.log("existed label",existedLabel)
      if (existedLabel && existedLabel.name === data.name) {
        throw new Error("Label already exists");
      } else {
        const label = new Label(data);

        const newLabel = await label.save();
        resolve(newLabel);
      }
    } catch (error) {
      // console.log("catch block")
      reject(error);
    }
  });
};

const getLabel = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allLabels = await Label.find();
      // console.log(allLabels);
      resolve(allLabels);
    } catch (error) {
      reject(error);
    }
  });
};

export { createNewLabel, getLabel };
