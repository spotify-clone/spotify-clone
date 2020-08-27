// const express = require("express");
// const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200);
  next()
});

// router.get("/", (req, res) => {
//   res.send({ response: "Server is up and running." }).status(200);
// });

// module.exports = router;