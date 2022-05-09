const passport = require("passport");
const bcrypt = require("bcrypt");
const { Strategy: LocalStrategy } = require("passport-local");
const { userSignUp } = require("../models");

module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "createId",
        passwordField: "createPass",
      },
      async (id, password, done) => {
        try {
          const user = await userSignUp.findOne({
            where: { id },
          });
          if (!user) {
            return done(null, false, { reason: "이메일이 일치하지 않습니다." });
          }
          const result = await bcrypt.compare(password, userSignUp.password);
          if (result) {
            return done(null, user);
          }
          return done(null, false, { reason: "비밀번호가 일치하지 않습니다." });
        } catch (err) {
          console.error(err);
          return done(err);
        }
      }
    )
  );
};
