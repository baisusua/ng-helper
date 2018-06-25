const GetModel = function () {
    return {
        cdn: {
            dev: {
                "url": "",
                "dirname": "ng-helper",
                "ak": "",
                "sk": "",
                "bk": "",
                "v": "0.0.1",
                "ignore": ["*.html"]
            },
            prod: {
                "url": "",
                "dirname": "ng-helper",
                "ak": "",
                "sk": "",
                "bk": "",
                "v": "0.0.1",
                "ignore": ["*.html"]
            }
        },
        github: {
            dev: {
                "remote": "https://xxxxxx/name.git",
                "name": "name",
                "branch": "dev",
                "ignore": ["*.json", "*.css", "*.js", "*.jpg", "*.svg"]
            },
            prod: {
                "remote": "https://xxxxxx/name.git",
                "name": "name",
                "branch": "master",
                "ignore": ["*.json", "*.css", "*.js", "*.jpg", "*.svg"]
            }
        },
        docker: {

        },
        gitlab: {

        }
    }
}

module.exports = GetModel;