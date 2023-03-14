const fs = require("fs");
const open = require("open");
const path = require("path");
const deploy = require("./deploy");

const templatePath = path.join(__dirname, "gd.config.js");
const configPath = path.join(process.env.HOME || process.env.USERPROFILE, "gd.config.js");

/** 解析命令行 */
function getCommand() {
  const args = process.argv.slice(2);
  const res = { content: [], operate: {} };
  for (const v of args) {
    if (v.indexOf("=") !== -1) {
      res.operate[v.split("=")[0]] = v.split("=")[1];
    } else {
      res.content.push(v);
    }
  }
  return res;
}

function showHelp() {
  const package = require("../package.json");
  console.log(
    `
     > go-deploy v${package.version} <

     gd config              -编辑配置文件
     gd [dev/test/prod...]  -上传到指定节点

     请参考 https://www.npmjs.com/package/go-deploy
    `
  );
}

function editConfig() {
  if (!fs.existsSync(configPath)) {
    fs.writeFileSync(configPath, fs.readFileSync(templatePath));
  }
  open(configPath);
}

function readConfig() {
  try {
    let config = require(configPath);

    // 格式化配置
    let { servers, ...common } = config;
    if (!Array.isArray(servers)) servers = [servers];

    config = servers
      // 过滤匹配的服务器
      .filter((server) => server.keyword.includes(getCommand().content[0]))
      // 组合配置参数
      .map((server) => ({ ...common, ...server, ...getCommand().operate }));

    if (!config || !config.length) {
      console.log("配置中未找到" + getCommand().content[0] + "节点");
    }

    return config;
  } catch (error) {
    console.log("配置文件读取失败，请检查\n", error);
  }
}

if (!getCommand().content[0]) return showHelp();
if (getCommand().content[0] === "config") return editConfig();

const config = readConfig();
if (config && config.length) deploy(config);

module.exports = { getCommand };
