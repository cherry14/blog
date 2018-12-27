//引入sql模块
const mysql = require('mysql')
//调取数据库
const conn=mysql.createConnection({
    host:'127.0.0.1',
    database:'blog',
    user:'root',
    password:'root'
})

module.exports=conn