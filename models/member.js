const path= require('path');
const fs = require('fs').promises;
const bcrypt = require('bcrypt');

const member={
	join : async function(data){
		try{
			delete data.memPwRe;
			
			data.memPw = await bcrypt.hash(data.memPw,10);
			
			const filpath = path.join(__dirname, '../data/member',data.memId+'.json');
			await fs.writeFile(filePath, JSON.stringify(data));
			
			return true;
		}catch(err){
			return false;
		}
	},
	
	login : async function(memId, memPw, req){
		
		try{
			const info = await this.get(memId);
			if(info){
				throw new Error('아이디 또는 비밀번호가 잘못 입력되었습니다.')
			}
			
			const match = await bcrypt.compare(memPw, info.memPw);
			if(match){
				req.session.memId=memId;
				
				return true;
			}else{
				throw new Error('아이디 또는 비밀번호가 잘못 입력되었습니다.');
			}
		}catch(err){
			return false
		}
	},
	get : async function(memid){
		try{
			const filepath = path.join(__dirname,'../data/member'+memId+'.json');
			let data = await fs.readFile(filepath);
			data=JSON.parse(data.toString());
			return data;
		}catch(err){
			return false;
		}
	}
};

module.exports = member;