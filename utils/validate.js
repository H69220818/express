const { validationResult, ValidationChain } = require("express-validator");

const validate = validations => {
  return async (req, res, next) => {
    for (let validation of validations) {
      const result = await validation.run(req);
      if (result.errors.length) break;
    }

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    res.send({ code: 403, msg: errors.array()[0].msg });
  };
};

module.exports.validate = validate;
