const path = require('path');
const FlieHelper = require('../libs/utils/file.tool');
const CreatePath = require('../libs/utils/path.tool');

const WriteConfigByType = async function (type,data) {
    const path = CreatePath(type);
    const file = await FlieHelper.WriteFile(path,data);
    return file;
}
module.exports = GetConfigByType;