const path = require('path');
const publicPath = process.cwd();
const CreatePath = function (type) {
    const name = type !== 'github' && type !== 'cdn' && type !== 'docker' && type !== 'gitlab' ? 'github' : type;
    return path.join(publicPath, `./${type}.helper.json`)
}
module.exports = CreatePath;