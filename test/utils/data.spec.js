const expect = require('expect')
const ReduceData = require('../../libs/utils/data.tool');

describe('Test ReduceData', () => {
    it('obj to string !isRead', (next) => {
        expect(ReduceData({
            a: 1
        })).toEqual(`{"a":1}`);
        next()
    })
    it('string to obj isRead', (next) => {
        expect(ReduceData(`a`,true)).toEqual(`a`);
        expect(ReduceData(`{"a":1}`,true)).toMatchObject({
            "a": 1
        });
        next()
    })
})