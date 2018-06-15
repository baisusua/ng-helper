const path = require('path');
const colors = require('colors');
const FlieHelper = require('../../libs/utils/file.tool');
const CreatePath = require('../../libs/utils/path.tool');

const GetConfigByType = async function (type) {
    console.log(`start get ${type} config`.cyan);
    console.log('');
    const path = CreatePath(type);
    const file = await FlieHelper.FileStatus(path);
    if (file.status) {
        console.log(`get ${path} success`.green);
        return file;
    }
    console.log(`get ${path} error`.red);
    return file;
}

module.exports = GetConfigByType;