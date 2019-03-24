// mysql数据库连接池
const mysql=require('mysql');
var pool =mysql.createPool({
  host:'127.0.0.1',
  port:3306,
  user:'root',
  password:'',
  database:'xiaofeiniu',
  connectionLimit:20    //连接池中链接的数量；
})
module.exports=pool