const path = require('path');
const colors = require('colors');
const FlieHelper = require('../../libs/utils/file.tool');
const CreatePath = require('../../libs/utils/path.tool');

const GetConfigData = async function (env) {
    console.log(`Start getting configuration files(cdn,github)`.cyan);
    console.log('');
    const cdnPath = CreatePath('cdn');
    const githubPath = CreatePath('github');
    const angularPath = CreatePath('angular');
    const cdnFile = await FlieHelper.FileStatus(cdnPath);
    const githubFile = await FlieHelper.FileStatus(githubPath);
    const angualrFile = await FlieHelper.FileStatus(angularPath);
    const order = {
        build: '',
        cdn: '',
        github: '',
        docker: '',
        gitlab: '',
        outputPath: 'dist'
    }
    if (env) {
        order.build = `ng build --prod -c ${env} --build-optimizer`;
    } else {
        order.build = `ng build --prod --build-optimizer`;
    }
    if (angualrFile.status) {
        if (env) {
            if (!angualrFile.data.projects[angualrFile.data.defaultProject].architect.build.configurations[env]) {
                console.log(`can not find ${env} config `.yellow);
            }
        }
        order.outputPath = angualrFile.data.projects[angualrFile.data.defaultProject].architect.build.options.outputPath;
    } else {
        console.log(`can not find angualr.json `.red);
        order.build = '';
    }
    if (cdnFile.status) {
        if (cdnFile.data.url && cdnFile.data.ak && cdnFile.data.sk && cdnFile.data.bk) {
            order.build = order.build?order.build + ` --base-href=${cdnFile.data.url}`:'';
            if (cdnFile.data.v) {
                order.build = order.build ? order.build + `${cdnFile.data.v}/` : '';
            }
            if (cdnFile.data.dirname) {
                order.build = order.build ? order.build + `${cdnFile.data.dirname}/` : '';
            }
        }
        order.cdn = cdnFile.data;
    }
    if (githubFile.status) {
        order.github = githubFile.data;
    }
    return order;
}
module.exports = GetConfigData;