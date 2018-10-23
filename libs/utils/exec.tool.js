const colors = require('colors');
const { spawn } = require('child_process');
const publicPath = process.cwd();
const run = function(order, path) {
    return new Promise((resolve) => {
        console.log(`Start run ${order}`.cyan);
        const [program, ...args] = order.split(' ');
        const child = spawn(
            program,
            args, {
                cwd: path ? path : publicPath,
                stdio: 'inherit',
                maxBuffer: 4000 * 1024
            },
        );
        if (child.stdout) {
            child.stdout.on('data', (data) => {
                console.log(colors.white(data));
            });
        }
        if (child.stderr) {
            child.stderr.on('data', (error) => {
                console.log(colors.yellow(error));
            });
        }
        child.on('close', (code) => {
            if (code === 0) {
                console.log(colors.green(`run ${order} done`));
                console.log('');
                resolve({
                    status: true
                });
            } else {
                console.log(``);
                console.log(colors.red(`run ${order} error code: ${code}`));
                resolve({
                    status: false
                });
            }
        });
    })
}
module.exports.run = run;