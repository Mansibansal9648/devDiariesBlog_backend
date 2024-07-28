export const apiResponseErr = (data, success, responseCode, errMessage,res) => {
  return res.status(responseCode).send({
    data: data,
    success: success,
    responseCode: responseCode,
    errMessage: errMessage ?? "Something went wrong",
  });
};

export const apiResponseSuccess = (data, success, responseCode, resMessage, res) => {
  return res.status(responseCode).send({
    data: data,
    success: success,
    responseCode: responseCode,
    resMessage: resMessage,
  });
};
