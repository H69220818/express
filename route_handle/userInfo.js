const { db } = require("../config");
const { validationResult } = require("express-validator");

exports.userInfo = (req, res) => {
  const sql = `select id, username, nickname, email,  from user where id=?`;
  // 注意：req 对象上的 user 属性，是 Token 解析成功，express-jwt 中间件帮我们挂载上去的
  db.query(sql, req.auth.id, (err, results) => {
    // 1. 执行 SQL 语句失败
    if (err) return res.cc(err);

    // 2. 执行 SQL 语句成功，但是查询到的数据条数不等于 1
    if (results.length !== 1) return res.cc("获取用户信息失败！");

    // 3. 将用户信息响应给客户端
    res.send({
      status: 200,
      message: "获取用户基本信息成功！",
      data: results[0]
    });
  });
};

exports.userInfoUpdate = (req, res) => {
  const sql = `update user set ? where id=?`;
  db.query(sql, [req.body, req.auth.id], (err, results) => {
    // 执行 SQL 语句失败
    if (err) return res.cc(err);

    // 执行 SQL 语句成功，但影响行数不为 1
    if (results.affectedRows !== 1) return res.cc("修改用户基本信息失败！");

    // 修改用户信息成功
    return res.cc("修改用户基本信息成功！", 200);
  });
};

exports.avatarUpdate = (req, res) => {
  console.log(req.body);
  res.send();
};
