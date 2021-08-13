const express= require('express');
const { joinValidator, loginValidator } = require("../middleware/member");
const { alert } = require("../lib/common");
const member = require('../models/member');
const router = express.Router();







router.route('/join')
	.get((req,res)=>{
		return res.render('member/join');
	})
	.post(joinValidator,async(req,res)=>{
		const result = await member.join(req.body);
		if(result) {
			return res.redirect('/member/login');
		}
		
		return alert('회원가입에 실패하였습니다',res,true);
	});
	
	
router.route('/login')
	.get((req,res)=>{
		return res.render('member/login');
	})
	.post(loginValidator, async (req,res)=>{
		const result =await member.login(req.body.memId, req.body.memPw, req);
		if(result){
			return res.redirect('/');
		}
		
		return alert('로그인에 실패하였습니다.',res,true)
	});


router.get('/logout',(req,res)=>{
	req.session.destroy();
	return res.redirect('/');
})	;

module.exports = router;
