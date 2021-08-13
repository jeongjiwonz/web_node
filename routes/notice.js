const express = require('express');
const router = express.Router();

router.get('/notice',(req,res)=>{
	return res.send('게시판 예정');
});

module.exports = router;