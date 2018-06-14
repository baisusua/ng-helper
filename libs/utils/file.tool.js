const fs = require('fs');
const ReduceData = require('./data.tool');
const ReadFile = function (path) {
    return new Promise((resolve) => {
        fs.readFile(path, (err, data) => {
            if (err) {
                resolve({
                    status: false,
                    data: err
                });
            } else {
                resolve({
                    status: true,
                    data: ReduceData(data)
                });
            }
        });
    })
}
const WriteFile = async function (path, data) {
    return new Promise((resolve) => {
        fs.writeFile(path, ReduceData(data), (err, data) => {
            if (err) {
                resolve({
                    status: false
                });
            } else {
                resolve({
                    status: true,
                    data: ReduceData(data)
                });
            }
        });
    })
}
const FileStatus = async function (path) {
    return await ReadFile(path);
}
module.exports.FileStatus = FileStatus;
module.exports.WriteFile = WriteFile;
module.exports.ReadFile = ReadFile;