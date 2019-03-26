// 小肥牛扫码点餐项目Api子系统
console.log("准备启动服务器")
console.log(new Date().toLocaleString())
const   PORT=8090;
const   express=require('express')
const   cors=require('cors')
const   bodyParser=require('body-parser')
const   categoryRouter=require('./routes/admin/category')
const   adminRouter=require('./routes/admin/admin')
const   dishRouter=require('./routes/admin/dish')
const   settingsRouter=require('./routes/admin/setting.js')
const   tableRouter=require('./routes/admin/table.js')
var app=express()
app.listen(PORT,()=>{
console.log('API服务器启动成功 Server Listening'+ PORT+"...")
console.log(new Date().toLocaleString())  
}) 
// 使用中间件.服务器和路由器中间使用cors
app.use(cors())
// application/x-www-form-urlencoded格式的请求主体数据解析出来放入到req.body属性中
app.use(bodyParser.json())//把JSON格式的请求主体解析出来放入req.body属性中
// 挂载路由器
app.use("/admin/category",categoryRouter)
app.use('/admin',adminRouter)
app.use('/admin/dish',dishRouter)
app.use('/admin/settings',settingsRouter)
app.use('/admin/table',tableRouter)
