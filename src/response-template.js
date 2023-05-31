const successResponse = ({ responseMessage = '', responseData = {} }) => ({
  status: 'success',
  message: responseMessage,
  responseData: responseData,
});

module.exports = { successResponse };
