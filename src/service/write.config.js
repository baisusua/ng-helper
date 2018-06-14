const path = require('path');
const colors = require('colors');
const FlieHelper = require('../../libs/utils/file.tool');
const CreatePath = require('../../libs/utils/path.tool');
const GetModel = require('../../libs/models/model');
const WriteConfigByType = async function (type, data) {
    console.log(`start write ${type} config`.white);
    console.log(``);
    let value;
    if (data) {
        value = data;
    } else {
        console.log(`start get default config`.white);
        value = GetModel()[type];
    }
    const path = CreatePath(type);
    const file = await FlieHelper.WriteFile(path, value);
    if (file.status) {
        console.log(`create ${path} success`.green);
        return file;
    }
    console.log(`create ${path} error`.red);
    return file;
}
module.exports = WriteConfigByType;