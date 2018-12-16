const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const moment = require('moment')
//链接数据库
const mysql = require('mysql')
const conn = mysql.createConnection({
    host:'127.0.0.1',
    database:'blog',
    user:'root',
    password:'root'

})



//设置模板引擎路径与名称
app.set('view engine','ejs')
app.set('views','./views')

//把node——modules托管为静态资源目录
// app.use('/node_modules',express.static('./node_modules'))
app.use('/node_modules',express.static('./node_modules'))


//请求首页
app.get('/',(req,res)=>{
    //进行渲染，在此之前一定要配置ejs引擎
    res.render('index',{})
})

//获取注册页面
app.get('/register',(req,res)=>{
    //点击后进行渲染，渲染目前是在views目录下
    res.render('./user/register',{})
    
})
//获取登录页面
app.get('/login',(req,res)=>{
    //点击后进行渲染，渲染目前是在views目录下
    res.render('./user/login',{})
    
})

//要注册用户了，这时候有数据  需要用post请求
app.post('/register',(req,res)=>{
    
res.send({msg:'ok',status:200})
const body = req.body
console.log(req.body)
if(body.uname.trim().length == 0 || body.password.trim().length==0||body.nickname.trim().length==0){
    return res.send({msg:'请输入完整信息',status:501})
}
//首先在musql中查询用户名是否重复
const sql1 = 'select count(*) as count users where uname=?'
conn.query(sql1,body.uname,(err,result)=>{
    //重复则返回信息
    if(err) return res.send({mag:'用户查询失败',status:502})
    if(result[0].count !== 0) return res.send({msg:'请更换其他用户名注册',status:'503'})

    //若不重复执行注册逻辑，用mysql语句进行添加
    body.ctime = moment().format('YYYY-MM-DD HH:mm:ss dddd')
    const sql2= 'insert into users set ?'
    conn.query(sql2,body,(err,result)=>{
        conn.query(sql2,body,(err,result)=>{
            //当注册失败，返回信息
            if (err) return res.status(500).send({
                status:500,mag:'注册失败请重试1'
            })
            //注册成功返回信息
            res.send({status:200,msg:'注册用户成功'})
            
        })
    })
    res.send({msg:'注册新用户成功',status:200})
    

})




})

//用户要登录了
app.post('/login',(req,res)=>{
    //先去数据库执行查询语句
     
    const loginsql = 'select * from users where uname=? and password=?'
    conn.query(loginSql,[req.body.uname,req.bosy.paaword],(err,result)=>{
        if(err || result.length == 0) return res.status(400).send({status:400,msg:'登录失败，请重试'})
        //当登录成功
        res.send({status:200,mag:'登录成功！'})
    })
})

app.listen(80,()=>{
    console.log('server running at http://127.0.0.1')
})

