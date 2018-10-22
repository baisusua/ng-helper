const colors = require('colors');
const shell = require('shelljs');

const publicPath = process.cwd();
const FlieHelper = require('../../libs/utils/file.tool');
const ExecTool = require('../../libs/utils/exec.tool');

const GetCommitLog = function() {
    console.log(`Get commit log`.cyan);
    const order = `git log -1 \
  --date=iso --pretty=format:'{"message": "%s","date": "%ad","commit": "%H"},' \
  $@ | \
  perl -pe 'BEGIN{print "["}; END{print "]\n"}' | \
  perl -pe 's/},]/}]/'`
    return new Promise((resolve, reject) => {
        shell.exec(order, (code, stdout, stderr) => {
            if (code) {
                resolve({
                    message: '获取commit log信息失败',
                    date: new Date(),
                    commit: ''
                })
            } else {
                resolve(JSON.parse(stdout)[0])
            }
        })
    })
}

const GetPackageVersion = async function(isTag) {
    console.log(`Get package version`.cyan);
    let res = {
        status: false
    }
    if (!isTag) {
        res = await ExecTool.run(`npm version patch`);
    }
    if (!res.status) {
        return {
            version: '获取package版本号失败'
        };
    }
    const path = path.join(publicPath, `./package.json`);
    const file = await FlieHelper.FileStatus(path);
    if (file.status) {
        return {
            version: file.data.version ? file.data.version : '获取package版本号失败'
        };
    }
    return {
        version: '获取package版本号失败'
    };
}

module.exports.GetCommitLog = GetCommitLog;
module.exports.GetPackageVersion = GetPackageVersion;