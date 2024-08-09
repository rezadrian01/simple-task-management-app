const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/auth");

router.get("/google", authControllers.getAuth);
router.get("/google/callback", authControllers.getAuthCallback);

module.exports = router;
