//创建单独的路由模块首先需要引入路由模块
const express= require('express')
const router = express.Router()

const ctrl=require('../controller/index.js')
//需要监听客户端的get请求  请求首页
router.get('/',ctrl.requreIndex)


//最后别忘了暴露一下这个对象让外界可以访问到哦
//不过别忘了在app.js中导入哦
module.exports=router
