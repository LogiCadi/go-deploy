const fs = require("fs");
const path = require("path");
const deploy = require("./deploy");
const configFilename = "gd.config.js";

main();
function main() {
  if (!getCommand().content[0]) return showHelp();

  if (getCommand().content[0] === "init") return initConfig();

  const config = readConfig();
  if (config && config.length) deploy(config);
}

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

     gd init                -初始化配置文件
     gd [dev/beta/prod...]  -上传到指定节点

     请参考 https://www.npmjs.com/package/go-deploy
    `
  );
}

/** init config file */
function initConfig() {
  const exists = fs.existsSync(path.join(process.cwd(), configFilename));
  if (exists) {
    return console.log(configFilename + " 配置文件已存在，请先手动删除它");
  }
  const template = fs.readFileSync(path.join(__dirname, configFilename));
  fs.writeFileSync(path.join(process.cwd(), configFilename), template);
  console.log(configFilename + " 配置文件已生成");
}

/** read config file */
function readConfig() {
  try {
    let config;
    if (getCommand().operate["config"]) {
      // 指定config文件
      config = require(getCommand().operate["config"]);
    } else {
      // 默认执行目录下的config文件
      config = require(path.join(process.cwd(), configFilename));
    }

    // 格式化配置
    let { servers, ...common } = config;
    if (!Array.isArray(servers)) servers = [servers];

    config = servers
      // 过滤匹配的服务器
      .filter((server) => server.keyword.includes(getCommand().content[0]))
      .map((server) => ({ ...common, ...server, ...getCommand().operate }));

    if (!config || !config.length) {
      console.log("配置中未找到" + getCommand().content[0] + "节点");
    }

    return config;
  } catch (error) {
    console.log("配置文件读取失败，请检查，或执行gd init生成配置文件");
  }
}

module.exports = { getCommand };
