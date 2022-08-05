const { db } = require("../config");
const bcryptjs = require("bcryptjs");
exports.register = (req, res) => {
  let userinfo = req.body;
  console.log(userinfo);
  if (!userinfo.username || !userinfo.password) {
    // return res.send({ code: 403, msg: "用户名或密码不合法" });
    return res.cc("用户名或密码不合法");
  }
  const sql = `select * from user where username=?`;

  db.query(sql, [userinfo.username], function(err, results) {
    // 执行 SQL 语句失败
    if (err) {
      return res.cc(err);
    }
    // 用户名被占用
    if (results.length > 0) {
      //   return res.send({ status: 1, message: "用户名被占用，请更换其他用户名！" });
      return res.cc("用户名被占用，请更换其他用户名！");
    }
    // TODO: 用户名可用，继续后续流程...
    userinfo.password = bcryptjs.hashSync(userinfo.password, 10);
    const sql = "INSERT INTO user SET ?";
    db.query(
      sql,
      { username: userinfo.username, password: userinfo.password },
      function(err, results) {
        // 执行 SQL 语句失败
        // if (err) return res.send({ status: 1, message: err.message });
        if (err) return res.cc(err);
        // SQL 语句执行成功，但影响行数不为 1
        if (results.affectedRows !== 1) {
          //   return res.send({
          //     status: 1,
          //     message: "注册用户失败，请稍后再试！"
          //   });
          return res.cc("注册用户失败，请稍后再试！");
        }
        // 注册成功
        // res.send({ status: 0, message: "注册成功！" });
        res.send("注册成功！", 200);
      }
    );
  });

  //   let sql = "SELECT * FROM `user`";
  //   db.query(sql, (err, resutls) => {
  //     res.send(resutls);
  //   });
};
exports.login = (req, res) => {
  res.send("login page");
};

exports.logout = (req, res) => {
  res.send("logout page");
};
