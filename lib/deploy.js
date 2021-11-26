const ftp = require("basic-ftp");
const { DirUtils } = require("dir-fs-utils");
const ProgressBar = require("progress");

module.exports = async function (config) {
  for (const c of config) {
    console.log(`> 节点 ${c.keyword[0]} ${c.host} 开始上传 <`);

    const totalSize = await DirUtils.getFolderSize(c.localRoot);
    const client = new ftp.Client(0);
    await client.access(c);
    bar = new ProgressBar("[:bar] :percent :etas", { width: 50, total: 100 });
    client.trackProgress((info) => bar.update(info.bytesOverall / totalSize));
    await client.uploadFromDir(c.localRoot, c.remoteRoot);
    client.close();

    console.log(`> 上传完成 <`);
  }
};
