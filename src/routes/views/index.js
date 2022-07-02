const { Router } = require("express");

const publicViews = require("./publicViews");

const router = Router();

router.use(publicViews);

module.exports = router;
