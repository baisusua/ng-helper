const path = require('path');
const colors = require('colors');
const FlieHelper = require('../../libs/utils/file.tool');
const CreatePath = require('../../libs/utils/path.tool');

const GetConfigByType = async function (type) {
    const path = CreatePath(type);
    const file = await FlieHelper.FileStatus(path);
    if (file.status) {
        return file;
    }
    console.log(`read ${path} error`.red);
    return file;
}

module.exports = GetConfigByType;