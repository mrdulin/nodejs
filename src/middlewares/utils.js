function utilFactory() {
  const createApiError = (code, msg) => {
    const err = new Error(msg);
    err.errorCode = code;
    err.errorMessage = msg;
    return err;
  };

  return {
    createApiError
  };
}

module.exports = utilFactory();
