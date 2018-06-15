const colors = require('colors');
const exec = require('child_process').exec;
const publicPath = process.cwd();
const run = function (order, path) {
    return new Promise((resolve) => {
        console.log(`Start run ${order}`.cyan);
        const child = exec(order, {
            cwd: path ? path : publicPath
        }, (error, stdout, stderr) => {
            if (error) {
                console.log(`Error message`.red);
                console.log(colors.yellow(error));
                resolve({
                    status: false
                });
                return;
            }
        });
        child.stdout.on('data', (data) => {
            console.log(colors.white(data));
        });
        child.stderr.on('data', (error) => {
            console.log(colors.yellow(error));
        });
        child.on('close', (code) => {
            if (code === 0) {
                console.log(colors.green(`run ${order} done`));
                resolve({
                    status: true
                });
            } else {
                console.log(``);
                console.log(colors.red(`run ${order} error code：' + ${code}`));
                resolve({
                    status: false
                });
            }
        });
    })
}
module.exports.run = run;