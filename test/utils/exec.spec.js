const expect = require('expect')
const RunTool = require('../../libs/utils/exec.tool');

describe('Test run tool', () => {
    it('run node -v', () => {
        expect.assertions(1);
        return RunTool.run(`node -v`).then(data => expect(data.status).toEqual(true));
    });
    it('run tttt error', () => {
        expect.assertions(1);
        return RunTool.run(`tttt`).then(data => expect(data.status).toEqual(false));
    });
})