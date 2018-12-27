const express=require('express')
const router=express.Router()

const ctrl=require('../controller/article.js')
//获取添加文章页面
router.get('/article/add',ctrl.getarticle)

//监听客户端发表文章请求
router.post('/article/add',ctrl.addArticle)

module.exports=router