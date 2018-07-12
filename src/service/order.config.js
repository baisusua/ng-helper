const path = require('path');
const colors = require('colors');
const FlieHelper = require('../../libs/utils/file.tool');
const CreatePath = require('../../libs/utils/path.tool');

const GetConfigData = async function (env) {
    console.log('');
    let prod = 'production';
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
        prod = env;
    } else {
        order.build = `ng build --prod --build-optimizer`;
    }
    if (angualrFile.status) {
        if (env) {
            if (!angualrFile.data.projects[angualrFile.data.defaultProject].architect.build.configurations[env]) {
                console.log(`can not find ${env} configuration `.yellow);
            }
        }
        order.outputPath = angualrFile.data.projects[angualrFile.data.defaultProject].architect.build.options.outputPath;
    } else {
        console.log(`can not find angualr.json `.red);
        order.build = '';
    }
    if (cdnFile.status) {
        if (cdnFile.data[prod].url && cdnFile.data[prod].ak && cdnFile.data[prod].sk && cdnFile.data[prod].bk) {
            order.build = order.build ? order.build + ` --deploy-url=${cdnFile.data[prod].url}` : '';
            if (cdnFile.data[prod].v) {
                order.build = order.build ? order.build + `${cdnFile.data[prod].v}/` : '';
            }
            if (cdnFile.data[prod].dirname) {
                order.build = order.build ? order.build + `${cdnFile.data[prod].dirname}/` : '';
            }
        }
        order.cdn = cdnFile.data;
    }
    if (githubFile.status) {
        order.github = githubFile.data[prod];
    }
    return order;
}
module.exports = GetConfigData;