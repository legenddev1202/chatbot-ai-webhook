const express = require('express');
const roomController = require("../controllers/roomController");
const router = express.Router();


router.post('/', roomController.webhook);



module.exports = router;