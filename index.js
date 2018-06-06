#!/usr/bin/env node

const colors = require('colors');
const path = require('path');
const program = require('commander');
const inquirer = require('inquirer');
const exec = require('child_process').exec;
const GetConfigByType = require('./src/read.config');
const config = {
    type: 'c',
    filename: 'template',
    name: 'Template',
    path: process.cwd(),
    init: false,
    map: false
}

program
    .version('0.0.1')
    .option(
        '-t, --type [value]',
        `choose type，
        c component, 
        m module, 
        d directive, 
        s mobk,
        p pipe, n ngrx, 
        a ngrx/action, 
        spec-c component-spec with input ouput provider event, 
        spec-s service-spec, 
        spec-d directive-spec, 
        spec-p pipe-spec, default component`,
        'c'
    )
    .option('-n, --file [value]', 'file name, default template', 'template')
    .option('-p, --path [value]', 'need relative file path', '')
    .usage('<keywords>')
    .parse(process.argv);
console.log(program.args);
GetConfigByType('github');

