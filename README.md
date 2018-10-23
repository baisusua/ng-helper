### ng-helper
- 支持CDN上传打包文件。
- 支持GIT上传打包文件。

###### 使用说明

1. 安装
    npm install ng-helper -g

2. 初始化配置文件
	1. 默认配置文件
  执行  ` ng-helper init `
    在根目录生成 ***github.helper.json*** 和  ***cdn.helper.json ***文件，默认使用 ***七牛CDN***  和 ***Git*** 进行发布
    如不需要使用 ***七牛CDN***  和 ***Git***  移除相关配置文件即可
    
  2. 自定义生成某一配置文件
  执行  ` ng-helper create -t TYPE `
  TYPE值请参考 ***TYPE类型***

3. 打包发布
  1. 默认打包发布命令
  执行  `  ng-helper publish  `
  使用 ***production*** 配置项

  2. 自定义打包发布命令
  执行  `  ng-helper publish  -e ENV`
  使用 ***ENV*** 配置项
  使用非 ***production*** 配置项，请在 ***angular.json***  中提前进行配置，例如下面的 ***dev***  配置项
  PS: Angular6以后不能单独配环境变量, 即在`angular.json`的`configurations`中添加环境变量后, 还要把对应的编译选项也加上, 如果编译选项为空, 那么当做开发环境进行编译
  
```json
{
  "projects": {
    "projec_name": {
      "architect": {
        "build": {
          "configurations": {
            "production": {
              "fileReplacements": [{
                "replace": "src/environments/environment.ts",
                "with": "src/environments/environment.prod.ts"
              }]
            },
            "dev": {
              "fileReplacements": [{
                "replace": "src/environments/environment.ts",
                "with": "src/environments/environment.dev.ts"
              }]
            }
          }
        }
      }
    }
  }
}
```

###### TYPE类型

| **命令**                  | **文件配置**          | **备注**   |
| ------------------------- | --------------------- | ---------- |
| **ng-helper create**      | *cdn.helper.json*     | CDN配置项  |
| **ng-helper create -t c** | *cdn.helper.json*     | CDN配置项  |
| **ng-helper create -t g** | *github .helper.json* | Git配置项  |
| **ng-helper create -t d** | *docker.helper.json*  | 暂时不支持 |
| **ng-helper create -t l** | *gitlab.helper.json*  | 暂时不支持 |
| **ng-helper publish -tag l** | *true，false 默认为true*  | 自动打tag并升级版本号 |
| **ng-helper publish -o l** | *true，false 默认为true*  | 自动打开发布仓库地址 |
| **ng-helper publish -m l** | *version，commit 默认为version*  | 提交信息类型 |
| **ng-helper publish -s l** | *true，false 默认为true*  | 控制台是否显示提交信息 |

###### 配置说明

1. CDN配置项--cdn.helper.json

```json
{
  "dev": {
    "url": "http://xxxxxxxx/", //资源地址 url+"dirname/v/"+file
    "dirname": "ng-helper-dev",
    "ak": "xxxxxxxx",
    "sk": "xxxxxxxx",
    "bk": "xxxxxxxx",
    "v": "0.0.1",
    "zone": "Zone_z0", //Zone_z0、Zone_z1、Zone_z2、Zone_na0、Zone_as0 参考七牛node sdk下的zone.js文件
    "ignore": [ // 以下类型文件不会被上传到CDN
      "*.html"
    ]
  },
  "production": {
    "url": "http://xxxxxxxx/",
    "dirname": "ng-helper-prod",
    "ak": "xxxxxxxx",
    "sk": "xxxxxxxx",
    "bk": "xxxxxxxx",
    "v": "0.0.1",
    "zone": "Zone_z0",
    "ignore": [
      "*.html"
    ]
  }
}
```

2. Git配置项--github.helper.json
   
```json
{
  "dev": {
    "remote": "xxxxxxxxx",
    "branch": "dev",
    "dirname": "dist", //git仓库下哪一目录
    "ignore": [ // 以下类型文件不会被提交到发布仓库
      "*.json",
      "*.css",
      "*.js",
      "*.jpg",
      "*.svg"
    ]
  },
  "production": {
    "remote": "xxxxxxxxx",
    "branch": "master",
    "dirname": "dist", //git仓库下哪一目录
    "ignore": [ // 以下类型文件不会被提交到发布仓库
      "*.json",
      "*.css",
      "*.js",
      "*.jpg",
      "*.svg"
    ]
  }
}
```

###### 备注

暂不支持docker和gitlab部署
### ng-helper
- 支持CDN上传打包文件。
- 支持GIT上传打包文件。

###### 使用说明

1. 安装
    npm install ng-helper -g

2. 初始化配置文件
	1. 默认配置文件
  执行  ` ng-helper init `
    在根目录生成 ***github.helper.json*** 和  ***cdn.helper.json ***文件，默认使用 ***七牛CDN***  和 ***Git*** 进行发布
    如不需要使用 ***七牛CDN***  和 ***Git***  移除相关配置文件即可
    
  2. 自定义生成某一配置文件
  执行  ` ng-helper create -t TYPE `
  TYPE值请参考 ***TYPE类型***

3. 打包发布
  1. 默认打包发布命令
  执行  `  ng-helper publish  `
  使用 ***production*** 配置项

  2. 自定义打包发布命令
  执行  `  ng-helper publish  -e ENV`
  使用 ***ENV*** 配置项
  使用非 ***production*** 配置项，请在 ***angular.json***  中提前进行配置，例如下面的 ***dev***  配置项
  PS: Angular6以后不能单独配环境变量, 即在`angular.json`的`configurations`中添加环境变量后, 还要把对应的编译选项也加上, 如果编译选项为空, 那么当做开发环境进行编译
  
```json
{
  "projects": {
    "projec_name": {
      "architect": {
        "build": {
          "configurations": {
            "production": {
              "fileReplacements": [{
                "replace": "src/environments/environment.ts",
                "with": "src/environments/environment.prod.ts"
              }]
            },
            "dev": {
              "fileReplacements": [{
                "replace": "src/environments/environment.ts",
                "with": "src/environments/environment.dev.ts"
              }]
            }
          }
        }
      }
    }
  }
}
```

###### TYPE类型

| **命令**                  | **文件配置**          | **备注**   |
| ------------------------- | --------------------- | ---------- |
| **ng-helper create**      | *cdn.helper.json*     | CDN配置项  |
| **ng-helper create -t c** | *cdn.helper.json*     | CDN配置项  |
| **ng-helper create -t g** | *github .helper.json* | Git配置项  |
| **ng-helper create -t d** | *docker.helper.json*  | 暂时不支持 |
| **ng-helper create -t l** | *gitlab.helper.json*  | 暂时不支持 |
| **ng-helper publish -tag l** | *true，false 默认为true*  | 自动打tag并升级版本号 |
| **ng-helper publish -o l** | *true，false 默认为true*  | 自动打开发布仓库地址 |
| **ng-helper publish -m l** | *version，commit 默认为version*  | 提交信息类型 |
| **ng-helper publish -s l** | *true，false 默认为true*  | 控制台是否显示提交信息 |

###### 配置说明

1. CDN配置项--cdn.helper.json

```json
{
  "dev": {
    "url": "http://xxxxxxxx/", //资源地址 url+"dirname/v/"+file
    "dirname": "ng-helper-dev",
    "ak": "xxxxxxxx",
    "sk": "xxxxxxxx",
    "bk": "xxxxxxxx",
    "v": "0.0.1",
    "zone": "Zone_z0", //Zone_z0、Zone_z1、Zone_z2、Zone_na0、Zone_as0 参考七牛node sdk下的zone.js文件
    "ignore": [ // 以下类型文件不会被上传到CDN
      "*.html"
    ]
  },
  "production": {
    "url": "http://xxxxxxxx/",
    "dirname": "ng-helper-prod",
    "ak": "xxxxxxxx",
    "sk": "xxxxxxxx",
    "bk": "xxxxxxxx",
    "v": "0.0.1",
    "zone": "Zone_z0",
    "ignore": [
      "*.html"
    ]
  }
}
```

2. Git配置项--github.helper.json
   
```json
{
  "dev": {
    "remote": "xxxxxxxxx",
    "branch": "dev",
    "dirname": "dist", //git仓库下哪一目录
    "ignore": [ // 以下类型文件不会被提交到发布仓库
      "*.json",
      "*.css",
      "*.js",
      "*.jpg",
      "*.svg"
    ]
  },
  "production": {
    "remote": "xxxxxxxxx",
    "branch": "master",
    "dirname": "dist", //git仓库下哪一目录
    "ignore": [ // 以下类型文件不会被提交到发布仓库
      "*.json",
      "*.css",
      "*.js",
      "*.jpg",
      "*.svg"
    ]
  }
}
```

###### 备注

暂不支持docker和gitlab部署
