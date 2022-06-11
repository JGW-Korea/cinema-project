const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  if (req.session.user) {
    req.session.destroy((err) => {
      if (err) console.log(err);
      res.send({
        loggedIn: false,
      });
    });
  }
});

module.exports = router;
