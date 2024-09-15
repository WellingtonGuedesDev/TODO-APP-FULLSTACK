const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send({
        success: true,
        statusCode: 200,
        message: 'Welcome to the TODO API'
    })
})

module.exports = router;
