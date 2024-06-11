import { createNewLabel } from "../repository/labelRepository.js";
import {
  apiResponseSuccess,
  apiResponseErr,
} from "../middlewares/apiResponse.js";

const createLabel = async(req, res) => {
  try {
    let data = req.body;
    if (!data.name) {
      throw new Error("Label Name is required field");
    }
    // console.log(data);
    let result = await createNewLabel(data);
    // return res.status(201).send("label created successfully");
    return res
      .status(201)
      .send(apiResponseSuccess({}, true, 201, "Label created successfully"));
  } catch (error) {
    // return res.status(400).send(error);
    // console.log("controller catch")
    return res
      .status(400)
      .send(apiResponseErr(null, false, 400, error.message));
  }
};

const getAllLabel = (req, res) => {};

export { createLabel, getAllLabel };
