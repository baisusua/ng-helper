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
    .version('0.0.1')
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
        prod //ng build --prod --build-optimizer  prod可以使用默认配置`
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
            console.log();
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
                console.log(``);
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