# go-deploy

一键上传部署静态文件工具，支持多服务器配置

## 安装

`npm install go-deploy -g`

## 生成配置文件

`gd config`

修改 gd.config.js 配置文件

## 上传部署

`gd [dev/test/prod...]`

根据 `gd.config.js` 中的 `servers` 关键字(keyword)匹配

例如，keyword: ["开发环境", "dev", "开发"]

那么执行命令 `gd dev` 或 `gd 开发环境`

都是部署至开发环境

可以一次匹配多台 server

### 动态参数

`gd dev password=123 remoteRoot=root` 动态设置配置中的参数
