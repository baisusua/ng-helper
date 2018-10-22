#!/usr/bin/env node

const colors = require('colors');
const path = require('path');
const program = require('commander');
const InitConfigByType = require('./src/control/init.control');
const BuildWeb = require('./src/control/build.control');
const PushWeb = require('./src/control/git.control');
const UploadWeb = require('./src/control/upload.control');
const tconfig = {
    c: 'cdn',
    g: 'github',
    d: 'docker',
    l: 'gitlab'
}
program
    .version(require('./package.json').version)
    .option(
        '-t, --type [value]',
        `choose type，
        c cdn.helper.json //only support 七牛 https://www.qiniu.com/, 
        g github.helper.json, 
        d docker.helper.json, 
        l gitlab.helper.json //只支持创建内部项目模板，外网会拉取不到项目配置`,
        'c'
    )
    .option(
        '-e, --env [value]',
        `choose env
        other //ng build --prod -c other --build-optimizer other环境需要自己去angular.json/.../build/configurations/去配置, 
        production //ng build --prod --build-optimizer  production可以使用默认配置`,
        'production'
    )
    .option(
        '-tag, --dist-tag [value]',
        `选择是否给源代码打tag和升级版本号，默认开启
        false //关闭给源代码打tag和升级版本号的功能, 
        true //开启给源代码打tag和升级版本号的功能`,
        'true'
    )
    .option(
        '-o, --open [value]',
        `选择打包完成后是否自动打开发布页面的功能，默认开启
        false //关闭发布完成后自动打开发布页的功能, 
        true //开启发布完成后自动打开发布页的功能`,
        'true'
    )
    .option(
        '-m, --message [value]',
        `发布时提交信息类型 默认为源代码版本信息+commit信息
        date //时间戳类型+commit信息, 
        version //源代码版本信息+commit信息, 
        commit //只有源代码最新的提交信息`,
        'version'
    )
    .option(
        '-s, --show [value]',
        `是否给build出来的项目添加调试信息，项目控制台会输出提交信息 默认开启
        false //关闭添加调试信息功能, 
        true //开启添加调试信息功能`,
        'true'
    )
    .usage('<keywords>')
    .parse(process.argv);

if (!program.args.length) {
    console.log(`args error，only support 'init、create、publish'`.red);
    program.help();
} else {
    if (program.args[0] === 'init') {
        // 初始化默认配置
        if (program.type) {
            console.log();
        }
        InitConfigByType('cdn', (res) => {
            InitConfigByType('github', () => {
                console.log(``.green);
                console.log(`ng-helper init done`.green);
            })
        });
        return null;
    }
    if (program.args[0] === 'create') {
        // 检查-t是否合法
        if (!tconfig[program.type]) {
            console.log(`ERROR: not support  -t ${program.type}`.red);
            console.log(``);
            program.help();
            return;
        }
        // 创建配置文件
        InitConfigByType(tconfig[program.type], (res) => {
            console.log(``.green);
            console.log(`ng-helper create -t ${program.type} done`.green);
        });
        return null;
    }
    if (program.args[0] === 'publish') {
        BuildWeb(program.env, (res) => {
            if (res.status) {
                PushWeb.GitTask(program.env, (res) => {
                    if (res.status) {
                        console.log(``);
                    } else {
                        console.log(``);
                        console.log(`Push web error`.red);
                    }
                    PushWeb.GitClean();
                    UploadWeb(program.env);
                })
            } else {
                console.log(``);
                console.log(`Build web error`.red);
            }
        })
    }
}