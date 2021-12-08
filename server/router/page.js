const express = require("express");
const { User } = require("../models");
const bcrypt = require("bcrypt");
const { isNotLoggedIn } = require("../middlewares/login");

const router = express.Router();

//get
router.get("/", (req, res) => {
  res.send("hello ~ express");
});

// 회원가입
router.post("/signup", isNotLoggedIn, async (req, res, next) => {
  try {
    const exEmail = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    const exNickname = await User.findOne({
      where: {
        nick: req.body.nickname,
      },
    });

    if (exEmail) {
      return res.status(403).send("이미 사용중인 이메일입니다.");
    }
    if (exNickname) {
      return res.status(403).send("이미 사용중인 닉네임입니다.");
    }

    // 비밀번호 hash 화 하기
    const hashedPassword = await bcrypt.hash(req.body.password, 12);

    // User 테이블에 신규 유저 생성
    await User.create({
      nick: req.body.nickname,
      email: req.body.email,
      password: hashedPassword,
    });

    res.status(201).send("create User!");
  } catch (e) {
    console.log(e);
    next(e); // status(500)
  }
});

// 로그인
router.post("/login", isNotLoggedIn, (req, res, next) => {
  password.authenticate("local", (err, user, info) => {
    if (err) {
      console.log(err);
      next(err);
    }

    if (info) {
      res.status(403).send(info.reason);
    }

    return req.login(user, async (loginErr) => {
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }

      const fullUserWithoutPassword = await User.fiendOne({
        where: { id: user.id },
        attributes: {
          exclude: ["password"], // password 제외한 나머지 정보 가져오기
        },
      });
      return res.status(200).json(fullUserWithoutPassword);
    });
  })(req, res, next);
});

// 로그아웃
router.post("/logout", isNotLoggedIn, (req, res) => {
  req.logOut();
  req.session.destroy();
  res.send("로그아웃");
});

module.exports = router;
