const express=require('express')
const router = express.Router()




const ctrl=require('../controller/user.js')

//请求登录页面
router.get('/login',ctrl.getlogin)
//用户请求注册页面  监听路由
router.get('/register',ctrl. getRegister)
//退出登录
router.get('/logout',ctrl. getlogout)


//用户进行注册  这时候用post
router.post('/register',ctrl.postRegiter)
//用户要登录啦   这时候是post请求
router.post('/login',ctrl. postLogin)
//暴露之后别忘了在app.js中导入

module.exports=router