const express = require('express');
const router = express.Router();
const checkTokenExpiry = require("../middleware/checkTokenExpiry.js")
const controller = require("../controllers/controller.js")
router.post("/auth/login", controller.login)
router.use(checkTokenExpiry.checkTokenExpiry)
router.get("/me",controller.getUserProfile)
router.get("/getemails", controller.getEmails)
router.post("/sendmail", controller.sendEmail)





module.exports = router;
