const colors = require('colors');
const inquirer = require('inquirer');

const GetConfigByType = require('../service/read.config');
const WriteConfigByType = require('../service/write.config');

/* 获取配置以及初始化配置文件 */
const InitConfigByType = async function (type, cb) {
    const res = await GetConfigByType(type);
    if (res.status) {
        /* 没有找到配置文件 */
        console.log('');
        console.log(`WARING: ${type}.hlper.json exists already`.yellow);
        console.log('');
    }
    inquirer.prompt([{
        type: 'input',
        name: 'isAdd',
        message: `add ${type}.hlper.json ?(Y/N || y/n)`.magenta,
        validate: function (input) {
            if (input === 'N' || input === 'Y' || input === 'n' || input === 'y' || !input) {
                return true;
            }
            return 'input Y/N || y/n'.red;
        }
    }]).then(async (answers) => {
        if (answers.isAdd === 'y' || answers.isAdd === 'Y') {
            const res = await WriteConfigByType(type, '')
            cb(res)
            return;
        }
        console.log('');
        console.log(`Cancel create ${type}.hlper.json`.yellow);
        console.log('');
        cb({
            status: false
        })
    })
}
module.exports = InitConfigByType;