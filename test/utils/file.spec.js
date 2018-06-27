const expect = require('expect')
const FileTool = require('../../libs/utils/file.tool');

describe('Test file tool', () => {
    it('ReadFile FileStatus README.md true', () => {
        expect.assertions(1);
        return FileTool.FileStatus(`./README.md`).then(data => expect(data).toBeTruthy());
    });
    it('WriteFile test.json', () => {
        expect.assertions(1);
        return FileTool.WriteFile(`./test.json`, 1).then(data => expect(data).toBeTruthy());
    });
})