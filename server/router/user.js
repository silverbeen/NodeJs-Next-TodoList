const express = require("express");
const router = express.Router();
const { User } = require("../models");
const { isLoggedIn, isNotLoggedIn } = require("../middlewares/login");

router.get("/", isLoggedIn, async (req, res, next) => {
  try {
    if (req.user) {
      const user = await User.findOne({
        where: {
          id: req.user.id,
        },
      });
      const fullUserWithoutPassword = await User.findOne({
        where: { id: user.id },
        attributes: {
          exclude: {
            exclude: ["password"],
          },
        },
      });

      res.status(200).json(fullUserWithoutPassword);
    } else {
      res.status(200).json(null);
    }
  } catch (e) {
    console.log(e);
    next(e);
  }
});
