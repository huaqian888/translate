var express             = require('express');
var app                 = express();
var bodyParse           = require('body-parser')
const fs = require('fs');
const process = require("child_process");
// python文件地址
const PYPATH = '/home/huaqian/PythonProject/translate.py';
//增加头部信息解决跨域问题
app.all('*', function (req, res, next){
    res.header("Access-Control-Allow-Origin", "*");//允许源访问，本利前端访问路径为“http://localhost:8080”
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("X-Powered-By", ' 3.2.1');
    next();
});

//使用bodyParse解释前端提交数据
app.use(bodyParse.urlencoded({ extended: true }));
app.use(bodyParse.json());

// 处理根目录的get请求
app.get('/',function(req,res){
}) ;

// 处理/login请求
app.post('/translate',function(req,res){
    //获取登录名称和密码
    let word = req.body.word;
    if(typeof word == 'string') {
        word = [word]
    }
    let fileContent = fs.readFileSync(PYPATH, 'utf-8');
    fileContent = fileContent.replace(/origin = \[.*\]/g, `origin = ['${word.join(`','`)}']`);
    fs.writeFileSync(PYPATH, fileContent, 'utf-8');
    process.exec(`python3 ${PYPATH}`, async (err, stdout) => {
        if (!err) {
            res.status(200).send(new Buffer(stdout));
        }
    });
});

// 监听3000端口
var server=app.listen(3000);

console.log("服务器已运行");
console.log("监听网址为:http://127.0.0.1:3000/");
