const express =require('express')
const app = express()
const bodyParse =require('body-parser')
const fs=require('fs')
const path = require('path')
const session=require('express-session')

//注册session中间件
app.use(
    session({
    secret:'这是加密密钥',
    resave:false,
    saveUninitialized:false

}))





//利用中间件托管静态目录
app.use('/node_modules',express.static('./node_modules'))
//利用中间件设置bodyParse
app.use(bodyParse.urlencoded({extended:false}))







// //导入router/index.js路由模块,然后挂载到app上
// const router1 = require('./router/index.js')
// app.use(router1)
// //导入router/user.js路由模块,然后挂载到app上
// const router2 = require('./router/user.js')
// app.use(router2)

//使用循环的方式进行路由自动注册，readdir读取某个文件夹下所有文件
fs.readdir(path.join(__dirname,'./router'),(err,filenames)=>{
    if(err) return console.log('读取 router 目录中的路由失败')
    filenames.forEach(filename=>{
        //每次循环一次都能拼接出一个完整的路由模块
        console.log(path.join(__dirname,'./router',filename))
        const router = require(path.join(__dirname,'./router',filename))
        app.use(router)

    })
})







//设置默认采用的模板引擎名称

app.set('views engine','ejs')
//设置模板页面的存放路径
app.set('views','./views')








app.listen(80,()=>{
    console.log('server running at http://127.0.0.1')
})