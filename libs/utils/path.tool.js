const path = require('path');
const publicPath = process.cwd();
const CreatePath = function (type) {
    const name = type !== 'github' && type !== 'cdn' && type !== 'docker' && type !== 'gitlab' ? 'github' : type;
    if(type==='angular'){
        return path.join(publicPath, `./angular.json`)
    }
    return path.join(publicPath, `./${name}.helper.json`)
}
module.exports = CreatePath;