const errorWrapper = (ctrl) => {
    const func = async (req, res, next) => {
      try {
        await ctrl(req, res, next);
      } catch (error) {
        console.log("Error in multer:");
        console.log(error);
        next(error);
      }
    };
    return func;
  };
  module.exports = errorWrapper;