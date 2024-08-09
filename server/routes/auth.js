const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/auth");

router.get("/google", authControllers.getAuth);

module.exports = router;
