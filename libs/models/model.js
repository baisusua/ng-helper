const GetModel = function () {
    return {
        cdn: {
            "url": "",
            "dirname": "ng-helper",
            "ak": "",
            "sk": "",
            "bk": "",
            "v":"0.0.1"
        },
        github: {
            "remote": "https://xxxxxx/name.git",
            "name": "name",
            "branch": "dev",
            "ignore":["*.json","*.css","*.js","*.jpg","*.svg"]
        },
        docker: {

        },
        gitlab: {

        }
    }
}

module.exports = GetModel;