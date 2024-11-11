/**
 * @description This function is used to return a formatted error response
 * for internal server errors.
 * @param {object} error - the error object
 * @returns {object} - the formatted error response
 */
export const internalErrorResponse = (error) => {
    return {
      success: false,
      err: error,
      data: {},
      message: 'Internal server error'
    };
  };
  


/**
 * @description This function is used to return a formatted error response
 * for custom errors.
 * @param {object} error - the error object
 * @returns {object} - the formatted error response
 */
export const customErrorResponse = (error) => {
    if (!error.message && !error.explanation) {
      return internalErrorResponse(error);
    }
    return {
      success: false,
      err: error.explanation,
      data: {},
      message: error.message
    };
  };
  


/**
 * @description This function is used to return a formatted success response
 * @param {object} data - the data to be returned
 * @param {string} message - the success message
 * @returns {object} - the formatted success response
 */
export const successResponse = (data, message) => {
    return {
      success: true,
      message,
      data,
      err: {}
    };
  };
