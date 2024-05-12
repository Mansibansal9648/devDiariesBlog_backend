export const apiResponseErr = (data, success, responseCode, errMessage) => {
    return {
      data: data,
      success: success,
      responseCode: responseCode,
      errMessage: errMessage ?? 'Something went wrong',
    };
  };
  export const apiResponseSuccess = (data, success, responseCode, resMessage) => {
    return {
      data: data,
      success: success,
      responseCode: responseCode,
      resMessage: resMessage
    };
  };