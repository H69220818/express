var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
// 导入 cors 中间件
const cors = require("cors");
const joi = require("joi");
const { validationResult } = require("express-validator");

const { decodeToken, errorToken } = require("./config");

var app = express();
// 注意：只要配置成功了 express-jwt 这个中间件，就可以把解析出来的用户信息，挂载到 `req.user` 属性上
// 解析toke
app.use(decodeToken);
// 处理错误
// 错误中间件写在最后
app.use(errorToken);

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var userInfoRouter = require("./routes/userInfo");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

// 将 cors 注册为全局中间件
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//封装send
app.use((req, res, next) => {
  res.cc = function(err, code = 1) {
    res.send({
      code,
      msg: err instanceof Error ? err.message : err
    });
  };
  next();
});

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/userInfo", userInfoRouter);

// 错误中间件
app.use(function(err, req, res, next) {
  // 数据验证失败
  if (err instanceof joi.ValidationError) return res.cc(err);
  // 未知错误
  res.cc(err);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
