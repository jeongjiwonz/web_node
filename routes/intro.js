const express = require('express');
const router = express.Router();

router.get('/intro',(req,res)=>{
	return res.send('입양하개 소개 예정');
});

module.exports = router;