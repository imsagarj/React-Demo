var express = require('express');
var router = express.Router();

router.get('/test', function(req, res) {
     res.json({msg:"Successfully send posts.."})
});

module.exports = router;