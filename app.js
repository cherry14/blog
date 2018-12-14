const express = require('express')
const app = express()

//设置模板引擎路径与名称
app.set('views engine','ejs')
app.set('views','./views')

app.get('/',(req,res)=>{
    //进行渲染，在此之前一定要配置ejs引擎
    res.render('index.ejs',{})
})


app.listen(80,()=>{
    console.log('server running at http://127.0.0.1:80')
})