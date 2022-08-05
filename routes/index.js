var express = require("express");
var router = express.Router();
const index = require("../route_handle");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});
//注册
router.post("/register", index.register);
//登录
router.post("/login", index.login);
//退出
router.post("/logout", index.logout);

module.exports = router;
