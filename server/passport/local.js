const passport = require("passport");
const bcrypt = require("bcrypt");
const { Strategy: LocalStrategy } = require("passport-local");
const { User } = require("../models");

module.exports = () => {
  passport.use(
    new LocalStrategy({
      usernameField: "email",
      passwordField: "password",
    }),
    async (email, passport, done) => {
      try {
        const user = await User.findOne({
          where: { email },
        });
        if (!user) {
          return done(null, false, { reason: "이메일이 일치하지 않습니다." });
        }

        const result = await bcrypt.compare(passport, user.password);
        if (result) {
          return done(null, user);
        }

        return done(null, false, {reason : "비밀번호가 일치하지 않습니다."})
      } catch (e) {
        console.log(e);
        return done(e);
      }
    }
  );
};
