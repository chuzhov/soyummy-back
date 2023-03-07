const express = require("express");
const getMainPage = require("../../controllers/pages/mainPage");

const router = express.Router();

router.get("/", getMainPage);

module.exports = router;
