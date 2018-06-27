const expect = require('expect')
const CreatePath = require('../../libs/utils/path.tool');

describe('Test path tool', () => {
    it('ReadFile FileStatus README.md true', () => {
        expect.assertions(1);
        return FileTool.FileStatus(`./README.md`).then(data => expect(data).toBeTruthy());
    });
    it('WriteFile test.json', () => {
        expect.assertions(1);
        return FileTool.WriteFile(`./test.json`, 1).then(data => expect(data).toBeTruthy());
    });
})