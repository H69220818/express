const { body } = require("express-validator");

const update_userinfo_schema = [
  body("nickname").isLength({ min: 3 }).withMessage("请大于3"),
  body("email").isEmail().withMessage("请输入正确的邮箱格式")
];

module.exports = {
  update_userinfo_schema
};
