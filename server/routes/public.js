const express = require("express");
const jsonwebtoken = require("jsonwebtoken");
const userDao = require("../services/user_dao");
const teacherDao = require("../services/teacher_dao");
const studentDao = require("../services/student_dao");
const { ROLES } = require("../utils/consts");
const { route } = require("./private");
const router = express.Router();
const expireTime = 1000; //seconds
const authErrorObj = {
  errors: [{ param: "Server", msg: "Authorization error" }],
};
const jwtSecret = "12345";

router.post("/login", async (req, res) => {
  const { username, password, role } = req.body;
  /**
   * @ROLE TEACHER
   * password login
   */
  if (ROLES.TEACHER === role) {
    if (!username || !password) {
      return res.status(404).send({
        errors: [{ param: "Server", msg: "Invalid username or password" }],
      });
    }
    try {
      const user = await userDao.getUser(username, role);
      if (!user) {
        return res.status(404).send({
          errors: [{ param: "Server", msg: "Invalid username or password" }],
        });
      }
      const isSame = await userDao.checkPassword(password, user.password);
      if (!isSame) {
        return res.status(401).send({
          errors: [{ param: "Server", msg: "Invalid username or password" }],
        });
      }
      const token = jsonwebtoken.sign({ user: user.id }, jwtSecret, {
        expiresIn: expireTime,
      });
      res.cookie("token", token, {
        httpOnly: true,
        sameSite: true,
        maxAge: 1000 * expireTime,
      });
      return res.json({
        id: user.id,
        username: user.username,
        role: user.role,
        name: user.name,
      });
    } catch (error) {
      return res.status(401).json(authErrorObj);
    }
  }
  /**
   * @ROLE STUDENT
   * no password
   */
  if (ROLES.STUDENT === role) {
    if (!username) {
      return res.status(404).send({
        errors: [{ param: "Server", msg: "Invalid username" }],
      });
    }
    try {
      const user = await userDao.getUser(username, role);
      if (!user) {
        return res.status(404).send({
          errors: [{ param: "Server", msg: "Invalid username" }],
        });
      }
      const token = jsonwebtoken.sign({ user: user.id }, jwtSecret, {
        expiresIn: expireTime,
      });
      res.cookie("token", token, {
        httpOnly: true,
        sameSite: true,
        maxAge: 1000 * expireTime,
      });
      return res.json({
        id: user.id,
        username: user.username,
        name: user.name,
        role: user.role,
      });
    } catch (error) {
      return res.status(401).json(authErrorObj);
    }
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("token").end();
});

module.exports = router;
