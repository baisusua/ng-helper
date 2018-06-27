const expect = require('expect')
const GetModel = require('../../libs/models/model');

describe('get default model', () => {
    it('should return default model', (next) => {
        expect(GetModel()).toMatchObject({
            cdn: {
                dev: {
                    "url": "http://xxxx/",
                    "dirname": "ng-helper",
                    "ak": "xxx",
                    "sk": "xxx",
                    "bk": "xxx",
                    "v": "0.0.1",
                    "ignore": ["*.html"]
                },
                production: {
                    "url": "http://xxxx/",
                    "dirname": "ng-helper",
                    "ak": "xxx",
                    "sk": "xxx",
                    "bk": "xxx",
                    "v": "0.0.1",
                    "ignore": ["*.html"]
                }
            },
            github: {
                dev: {
                    "remote": "https://xxxxxx/name.git",
                    "branch": "dev",
                    "ignore": ["*.json", "*.css", "*.js", "*.jpg", "*.svg", "*.txt"]
                },
                production: {
                    "remote": "https://xxxxxx/name.git",
                    "branch": "master",
                    "ignore": ["*.json", "*.css", "*.js", "*.jpg", "*.svg", "*.txt"]
                }
            },
            docker: {

            },
            gitlab: {

            }
        })
        next()
    })
})