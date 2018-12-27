const moment = require('moment')

const conn=require('../db/index.js')



//获取登录页面
const getlogin =(req,res)=>{
    res.render('./user/login.ejs',{})
}

//获取注册页面
const getRegister=(req,res)=>{
    //注意，当再调用 模板引擎的res.render函数的时候 ./相对路径app.set('view')指定的奴鲁来查找的
    res.render('./user/register.ejs',{})

}
//用户进行注册
const postRegiter = (req,res)=>{
    const body=req.body


    //判断用户输入的信息是否完成
    if(body.username.trim().length <= 0||body.password.trim().length<=0||body.nickname.trim()<=0){
        return res.send({msg:'请填写完整的表单数据后再注册用户',status:501})
    }

    // 判断数据中是否用户注册的信息重复  重复则return
    const sql1 = "select count(*) as count from users where username = ?"
    conn.query(sql1,body.username,(err,result)=>{
        if(err) return res.send({msg:'用户查询失败',status:502})
        if(result[0].count !== 0) return res.send({msg:'请更换其他用户名',status:503})
       body.ctime=moment().format('YYYY-MM-DD HH:mm:ss')
       //如果不重复  则执行注册的逻辑 将注册的信息插入到mysql中
       const sql2 = "insert into users set ?"
       
       conn.query(sql2,body,(err,result)=>{
          
        if(err) return  res.send({msg:'添加用户失败',status:504})
        if(result.affectedRows !== 1) return res.send({msg:'请更换其他用户名注册',status:504})

       })
       res.send({msg:'注册新用户成功,请登录',status:200})
 })

   
}
//用户进行登录
const postLogin = (req,res)=>{
    const body = req.body
    //在sql中查询用户名是否存在
    const sql2="select * from users where username=? and password=?"
    conn.query(sql2,[body.username,body.password],(err,result)=>{
        //如果期间查询sql语句失败就证明登录失败
        if(err) return res.send({msg:'用户登录失败',status:501})
        if(result.length !==1 )  return res.send({msg:'查询用户登录数据失败',status:502})
        //如果登录成功则返回成功信息

        //将登录成功信息挂载到session
        req.session.user=result[0]
        req.session.islogin=true
        
        res.send({msg:'用户登录成功',status:200})

    })

}

//退出登录
const  getlogout =(req,res)=>{
    //使用destory()方法注销登录
    req.session.destroy(function(){
        //注销后重定向到首页
        res.redirect('/')
    })
}



module.exports={
    getlogin,
    getRegister,
    postRegiter ,
    postLogin,
    getlogout
}