// 管理员相关路由
const express=require('express')
const pool=require('../../pool.js')
var router=express.Router();
// GRT /admin/dish 
// 获取所有的菜品（按照所有列别尽行分类）
// 返回数据；[
//  {cid:1,cname:'肉类',dishList:[{},{},{}]} 
//  {cid:2,cname:'菜类',dishList:[{},{},{}]} 
// ]

router.get('/',(req,res)=>{
  // 查询所有菜品的类别
  pool.query('SELECT cid,cname FROM xfn_category',(err,result)=>{
    if(err) throw err;
    var categoryList=result; //菜品类别的数组
    var count=0;
    for(var c of categoryList){
        // 循环查询每一个类别下有哪些菜品
        pool.query("SELECT *FROM xfn_dish WHERE categoryId=?",c.cid,(err,result)=>{
          c.dishList=result;
          count++;
          if(count==categoryList.length){
            res.send(categoryList)
          }
        })
    }
  })
})


module.exports=router;