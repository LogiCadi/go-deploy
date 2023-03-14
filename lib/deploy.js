const ftp = require("basic-ftp");
const { DirUtils } = require("dir-fs-utils");
const ProgressBar = require("progress");

module.exports = async function (config) {
  for (const c of config) {
    console.log(`> ${c.keyword[0]} ${c.host} ${c.localRoot} => ${c.remoteRoot} 开始上传 <`);

    const totalSize = await DirUtils.getFolderSize(c.localRoot);
    let uploadedSize = 0;

    const client = new ftp.Client();
    await client.access(c);

    // 进度条
    bar = new ProgressBar("[:bar] :percent :etas", { width: 50, total: 100 });
    client.trackProgress((info) => {
      uploadedSize = info.bytesOverall;
      bar.update(uploadedSize / totalSize);
    });

    await client.uploadFromDir(c.localRoot, c.remoteRoot);
    client.close();

    if (uploadedSize === totalSize) {
      console.log(`> 上传完成 共 ${uploadedSize} 字节 <`);
    } else {
      console.log(`> 上传失败！请检查 <`);
    }
  }
};
