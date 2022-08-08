const { db, setToken } = require("../config");
const bcryptjs = require("bcryptjs");
exports.register = (req, res) => {
  let userinfo = req.body;
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
  const userinfo = req.body;
  console.log(userinfo);
  const sql = `select * from user where username=?`;
  db.query(sql, userinfo.username, function(err, results) {
    // 执行 SQL 语句失败
    if (err) return res.cc(err);
    // 执行 SQL 语句成功，但是查询到数据条数不等于 1
    if (results.length !== 1) return res.cc("登录失败！");
    // TODO：判断用户输入的登录密码是否和数据库中的密码一致
    // 拿着用户输入的密码,和数据库中存储的密码进行对比
    const compareResult = bcryptjs.compareSync(
      userinfo.password,
      results[0].password
    );
    console.log(results, "compareResult");
    // 如果对比的结果等于 false, 则证明用户输入的密码错误
    if (!compareResult) {
      return res.cc("登录失败！");
    }

    // TODO：登录成功，生成 Token 字符串
    // 剔除完毕之后，user 中只保留了用户的 id, username, nickname, email 这四个属性的值
    const user = { ...results[0], password: "" };
    let token = setToken(user, 60 * 60);
    res.send({
      code: 200,
      token
    });
  });
};

exports.logout = (req, res) => {
  res.send("logout page");
};
