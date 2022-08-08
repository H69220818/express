var express = require("express");
const { validate } = require("../utils/validate");
const { update_userinfo_schema } = require("../schema/userInfo");

const {
  userInfo,
  userInfoUpdate,
  avatarUpdate
} = require("../route_handle/userInfo");

var router = express.Router();

/* GET users listing. */
router.get("/", userInfo);
// checkSchema(update_userinfo_schema)
router.post("/update", validate(update_userinfo_schema), userInfoUpdate);
router.post("/avatarUpdate", avatarUpdate);

module.exports = router;
