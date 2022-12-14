var express = require("express");
var router = express.Router();
//路由处理函数
const { register, login, logout } = require("../route_handle");
// 1. 导入验证表单数据的中间件
const expressJoi = require("@escook/express-joi");
// 2. 导入需要的验证规则对象
const { reg_login_schema } = require("../schema/index");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});
//注册
router.post("/register", expressJoi(reg_login_schema), register);
//登录
router.post("/login", expressJoi(reg_login_schema), login);
//退出
router.post("/logout", logout);

module.exports = router;
