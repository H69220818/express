let jwt = require("jsonwebtoken"); //生成token
const { expressjwt } = require("express-jwt"); // 解码token
let jwtScrect = "发生法沙发沙发郭德纲是德国豆腐花更丰富2626说dadas"; //签名

let decodeToken = expressjwt({
  credentialsRequired: true, //需要校验
  secret: jwtScrect, // 加密秘钥
  algorithms: ["HS384"] // 加密方式
}).unless({
  path: ["/login", "/register"] // 不需要校验的路径
  // path: ["/admin","/login"/^(\/admin|\/|\/login)/],
});

//生成token
let setToken = function(username, expiresIn) {
  var token = jwt.sign(username, jwtScrect, {
    expiresIn: expiresIn,
    algorithm: "HS384"
  });

  return token;
};

// 处理解析错误

// 定义错误中间件
function errorToken(err, req, res, next) {
  // 这次错误是由 token 解析失败导致的
  if (err.name === "UnauthorizedError") {
    return res.send({
      code: 401,
      message: "无效的token"
    });
  }
  res.send({ code: 500, message: "未知的错误" });
}
module.exports = {
  decodeToken,
  jwtScrect,
  setToken,
  errorToken
};
