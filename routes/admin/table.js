

const express=require("express")
const pool=require("../../pool")
var router=express.Router();
module.exports=router;
// 桌台相关的路由器
// 返回所有的桌台的信息
// 返回数据：[{
  // tid:xxx,tname:'xx',status:''
// }]
router.get('/',(req,res)=>{
  pool.query('SELECT * FROM xfn_table  ORDER BY tid',(err,result)=>{
    if(err) throw err;
    res.send(result);
  })  
})

