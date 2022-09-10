// Formatter for response
exports.formatResponse = (
  message,
  success = true,
  error_code = 500,
  data = {}
) => {
  const response = { success, message, data };

  return success
    ? response
    : {
        ...response,
        error_code,
      };
};
