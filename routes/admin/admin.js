// 管理员相关路由
const express=require('express')
const pool=require('../../pool.js')
var router=express.Router();
// 管理员登录
// API: GET/admin/login
// 完成登陆
// 请求的数据:{aname:'xxx',apwd:'xxx'}
//返回的数据:{code:200,msg:'login succ'}
// {code:400,msg:"aname or apwd err"}
router.get('/login/:aname/:apwd',(req,res)=>{
  var aname=req.params.aname
  var apwd=req.params.apwd  
  console.log(aname,apwd)
  pool.query('SELECT aid FROM xfn_admin WHERE aname=? AND apwd=PASSWORD(?)',[aname,apwd],(err,result)=>{
    if(err) throw err;
    if(result.length>0){//查询到一行数据,登录成功
      res.send({code:200,msg:'login succ'})
    }else{//没有查询到数据
      res.send({code:400,msg:"aname or apwd err"})
    }
    console.log(result)
  });
})


// API: PATCH /admin/login  修改部分数据用Patch
// 请求的数据:{aname:'xxx',oldPwd:'xxx',apwd:'xxx'}
// 根据管理员的名和密码修改管理员密码
// 返回数据:
// {code:200,msg:'modified succ'} 修改密码成功
// {code:400,msg:"aname or apwd err"} 修改密码错误
// {code:401,msg:"aname or modified"} 新密码与原来的密码一致
router.patch('/',(req,res)=>{
  var data=req.body
  console.log(data)  
  // 首先根据aname/oldPwd查询该用户是否存在，
  // 如果查询到了用户，在修改器密码；
  pool.query('SELECT aid FROM xfn_admin WHERE aname=? AND apwd=PASSWORD(?)',[data.aname,data.oldPwd],(err,result)=>{
    if(err) throw err;
    if(result.length==0){
      res.send({code:400,msg:'password err'})
      return ;
    }
    // 如果查到用户，修改其密码
    pool.query('UPDATE xfn_admin SET apwd=PASSWORD(?) WHERE aname=?',[data.newPwd,data.aname],(err,result)=>{
      if(err) throw err;
      if(result.changedRows>0){ //修改密码完成
        res.send({code:200,msg:"modify succ"})
      }else { //新旧密码一致，未作修改
        res.send({code:401,msg:'pwd not modified'})
      }
    })
  })
})
module.exports=router;