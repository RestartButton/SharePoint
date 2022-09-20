var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    res.render('../client/views/index.html');
});

router.get('/index', (req,res) => {
    res.render('../client/views/index.html');
});

module.exports = router;
