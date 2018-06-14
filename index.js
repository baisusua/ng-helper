#!/usr/bin/env node

const colors = require('colors');
const path = require('path');
const program = require('commander');
const inquirer = require('inquirer');
const exec = require('child_process').exec;
const InitConfigByType = require('./src/control/init.control');
program
    .version('0.0.1')
    .option(
        '-t, --type [value]',
        `choose type，
        c cdn.helper.json //only support 七牛 https://www.qiniu.com/, 
        g github.helper.json, 
        d docker.helper.json, 
        l gitlab.helper.json`,
        'c'
    )
    .usage('<keywords>')
    .parse(process.argv);

if (!program.args.length) {
    console.log(`args error，only support 'init、create、publish'`.red);
    program.help();
} else {
    if (program.args[0] === 'init') {
        // 初始化默认配置
        if(program.type){
            console.log(`WARING: init not support -t，'ng-helper init' will create 'cdn.helper.json' and 'github.helper.json'`.yellow);
            console.log();
        }
        InitConfigByType('cdn',(res)=>{
            InitConfigByType('github',()=>{
                console.log(``.green);
                console.log(`ng-helper init done`.green);
            })
        });
        // InitConfigByType('github');
        return null;
    }
}