const ExecTool = require('../../libs/utils/exec.tool');
const publicPath = process.cwd();
const GitRun = async function (order, path) {
    console.log(`run ${order}`.cyan);
    if (order) {
        const res = await ExecTool.run(order, path ? `${publicPath}/${path}` : '');
        return res;
    }
    return {
        status: false
    }
}
const GitClean = async function (path) {
    console.log(`clean .git`.cyan);
    const res = await ExecTool.run(`rm -rf .git`, path ? `${publicPath}/${path}` : '');
    return res;
}
const CreateGitOrder = function (config) {
    const cb = {
        mv: `mv ./${config.name}/.git ./`,
        rmdir: `rm -rf ${config.name}`,
        add: `git add -A`,
        head: `git reset --hard HEAD`,
        reset: '',
        checkout: `git checkout ${config.branch}`,
        commit: `git commit -m ${JSON.stringify(new Date())}`,
        clone: `git clone ${config.remote}`,
        push: `git push origin ${config.branch}`
    }
    if (config.ignore && config.ignore.length > 0) {
        cb.reset = `git reset ` + '\\' + config.ignore.join(` `);
    }
    return cb;
}
module.exports.GitRun = GitRun;
module.exports.GitClean = GitClean;
module.exports.CreateGitOrder = CreateGitOrder;