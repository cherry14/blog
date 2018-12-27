const moment=require('moment')
const conn=require('../db/index.js')

const getarticle=(req,res)=>{
    //如果没有登录是不能跳转的
       //判断用户是否灯枯没有登录的话直接重定向到首页
   if(!req.session.islogin) return res.redirect('/')
   res.render('./article/add.ejs',{
      
       user:req.session.user,
       islogin:req.session.islogin
   })

   
}

//添加新文章
const addArticle=(req,res)=>{
    const body=req.body
    body.authorid = req.session.user.id
    body.ctime=moment().format('YYYY-MM-DD HH:mm:ss')
    const sql = 'insert into article set ?'
    conn.query(sql,body,(err,result)=>{
        if(err) return res.send({msg:'发表文章失败',status:501})
        console.log(result)
    })
    

}

module.exports={
    getarticle,
    addArticle
}