const path = require('path');
const FlieHelper = require('../libs/utils/file.tool');
const CreatePath = require('../libs/utils/path.tool');
const GetConfigByType = async function (type) {
    const path = CreatePath(type);
    const file = await FlieHelper.FileStatus(path);
    console.log(file);
    return file;
}

module.exports = GetConfigByType;