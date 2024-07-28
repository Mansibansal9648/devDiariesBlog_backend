import {
  createNewLabel,
  getLabel,
  getLabelsByName,
} from "../repository/labelRepository.js";
import {
  apiResponseSuccess,
  apiResponseErr,
} from "../middlewares/apiResponse.js";

const createLabel = async (req, res) => {
  try {
    let data = req.body;
  if(data.name.charAt(0)==='_'){
    throw new Error("Label can't start from underscore")
  }
    let name = data.name.toLowerCase().replaceAll(" ", "");
    data.name=name;
    let result = await createNewLabel(data);
    return apiResponseSuccess(result, true, 201, "Label created successfully", res)
  } catch (error) {
    return apiResponseErr(null, false, 400, error.message, res)
  }
};

const getAllLabel = async (req, res) => {
  try {
    const result = await getLabel();
    return apiResponseSuccess(result, true, 200, "Getting all labels successfully", res)
  } catch (error) {
    return apiResponseErr(null, false, 400, error.message, res)
  }
};

const getLabelByName = async (req, res) => {
  try {
    let data = req.body;
    let name = data.name.replaceAll(" ", "");
     data.name=name;

    let result = await getLabelsByName(data);
    return apiResponseSuccess(result, true, 200, "Getting labels by name successfully", res)
      
  } catch (error) {
    return apiResponseErr(null, false, 400, error.message, res)
  }
};

export { createLabel, getAllLabel, getLabelByName };
