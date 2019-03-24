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
  pool.query('SELECT cid,cname FROM xfn_category ORDER BY cid',(err,result)=>{
    // 为了获取所有的菜品必须先查询菜品的类别；
    if(err) throw err;
    // console.log(result)
    // res.send(result)
    var categoryList=result; //菜品类别的数组
    var finishCount=0; //已经查询完菜品的类别的数量;     
    for(let c of categoryList){
        // 循环查询每一个类别下有哪些菜品
        pool.query("SELECT * FROM xfn_dish WHERE categoryId=? ORDER BY did DESC",c.cid,(err,result)=>{
          if(err) throw err
          c.dishList=result;
          finishCount++;
          // 必须保证所有的类别下的所有菜品都查询完成才能发送响应消息;
          // 这些查询都是异步的
          if(finishCount==categoryList.length){
            res.send(categoryList )
          }
        })
    }
  })
})
/*
// 接收客户端上传的菜品图片保存在服务器上,返回该图片在服务器上的随机文件名
// POST /admin/dish/image
// 请求参数
   引入multer中间件
   响应数据:{code:200,msg:'upload succ fileName:"124563213-4612.jpg"'}
*/
const multer=require('multer');
const fs=require('fs');
var upload=multer({
  dest:'tmp/' //指定客户端上传的文件的临时存储路径
})
//定义路由,使用文件上传中间件
// array上传多个文件
// dishImg与客户端上传的name中的值一致
router.post('/image',upload.single('dishImg'),(req,res)=>{
  // console.log(req.file) //客户端上传的文件
  // console.log(req.body) //客户端随同图片提交的字符数据;
  // 把客户端上传的文件从临时目录转移到永久的图片路径下
  var tmpFile=req.file.path;//临时文件   
  var suffix=req.file.originalname.substring(req.file.originalname.lastIndexOf('.'))//原始文件名 中的后缀部分
  
  var newFile=randFileName(suffix) //目标文件名;
  fs.rename(tmpFile,"img/dish/"+newFile,()=>{ //从原来的目录重定向到"img/dish/+文件名中
    res.send({code:200,msg:'upload succ',fileName:newFile})
  })//把临时文件转移
})
// 生成一个随机的文件名
// 参数:suffix表示要生成的文件名的后缀
function randFileName(suffix){
  var time=new Date().getTime(); //当前系统时间戳
  var num=Math.floor(Math.random()*(10000-1000)+1000)
  return time+'-'+num+suffix
}
// POST /admin/dish
// 添加一个新的菜品
// 请求参数：{title:'xx',imgUrl:'...jpg',price:xx,detail:"xx",categoryId:xx}
// 输出一个消息：
// {code:200,msg:"dish add succ",dishId:46}

router.post('/',(req,res)=>{
  pool.query('INSERT INTO xfn_dish SET ?',req.body,(err,result)=>{
    if(err) throw err;
    res.send({code:200,msg:'dish added succ',dishId:result.insertId}) 
    // 将INSETRT语句产生的自增编号输出给客户端；
    
  })
})


/* 
  PUT /admin/dish/:did
  根据指定的菜品编号修改该商品
  请求参数：{did:xx,title:'xx',imgUrl:'..jpg',price:xx,detail:'xx',categoryId:xx}
  输出数据：{code:200,msg:'dish update succ'}
  输出数据：{code:400,msg:'dish not exists'}  
*/


/* 
  Delete /admin/dish/:did
  根据指定的菜品编号删除该商品
  输出数据：{code:200,msg:'dish delete succ'}
  输出数据：{code:400,msg:'dish not exists'}  
*/
module.exports=router;