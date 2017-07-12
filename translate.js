/**
 * Created by wyf on 2017/6/20.
 */
let express = require('express');
let path = require('path');
let fs = require('mz/fs');
let chalk = require('chalk');

let app = express();
(function(){
    //扫描src目录下的文件及文件夹
    let startTime = new Date().getTime();
    let dirs = fs.readdirSync(path.join(__dirname, '/src'));
    let files = [];
    //let变量声明要在使用之前。
    let enJson = {};
    let zhJson = {};
    //迭代获取文件
    function getFiles(dirPath, dirs){
        Array.from(dirs).map(dir=> {
            let filePath = path.join(dirPath, dir);
            if(fs.statSync(filePath).isFile()){
                files.push(filePath);
            }else if(fs.statSync(filePath).isDirectory()){
                let childDirs = fs.readdirSync(filePath);
                getFiles(filePath, childDirs);
            }
        });
    }
    getFiles(path.join(__dirname, '/src'), dirs);
    files
        .filter(file=> file.endsWith('messages.js')||file.endsWith('enumsMessages.js'))
        .map(file=> setJson(require(file)['default']));
    function setJson(obj) {
        for(let key in obj){
            if(key=='id'){
                enJson[obj['id']] = obj['defaultMessage'];
                zhJson[obj['id']] = "";
                break;
            }else {
                setJson(obj[key]);
            }
        }
    }
    /*
    * 增加逻辑，判断en-US.messages.js文件是否存在
    * 如果文件存在则读取文件的内容，和enJson对象进行合并
    * 英文文件-en-US.messages.js
    * 中文文件-zh-Hans-CN.messages.js
    * */
    let enMessageFile = path.join(__dirname,'/locales', 'en-US.messages.js');
    let zhMessageFile = path.join(__dirname,'/locales', 'zh-Hans-CN.messages.js');
    if(fs.existsSync(enMessageFile)){
        //获取en-US.messages.js的原始json数据
        let enOriginJson = require(enMessageFile);
        enJson = Object.assign({}, enJson, enOriginJson);
    }
    if(fs.existsSync(zhMessageFile)){
        //获取en-US.messages.js的原始json数据
        let zhOriginJson = require(zhMessageFile);
        zhJson = Object.assign({}, zhJson, zhOriginJson);
    }
    fs.writeFileSync(enMessageFile, `module.exports=${JSON.stringify(enJson, null, "\t")};`, 'utf8');
    fs.writeFileSync(zhMessageFile, `module.exports=${JSON.stringify(zhJson, null, "\t")};`, 'utf8');
    //计算执行时间
    let execTime = new Date().getTime()-startTime;
    console.log(`Translate Success in ${chalk.green(execTime/1000)}s !`);
    process.exit(0);
})();

app.listen(4444);
