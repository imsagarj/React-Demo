var express = require('express');
var router = express.Router();

router.get('/test', function(req, res) {
     res.json({msg:"Successfully send profile.."})
});

module.exports = router;