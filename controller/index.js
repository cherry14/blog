//展示首页页面
const requreIndex = (req,res)=>{
    //使用render必须要设置上方的ejs模板引擎引用
    res.render('index.ejs',{
        user:req.session.user,
        islogin:req.session.islogin
    })
}

module.exports={
    requreIndex
}