const FtpDeploy = require("ftp-deploy");
var ProgressBar = require("progress");

const ftpDeploy = new FtpDeploy();

ftpDeploy.on("uploaded", function (data) {
  if (
    data.transferredFileCount % data.totalFilesCount === 1 ||
    data.totalFilesCount === 1
  ) {
    bar = new ProgressBar("[:bar] :percent :etas", {
      width: 50,
      total: data.totalFilesCount,
    });
  }
  bar.tick();
});

ftpDeploy.on("upload-error", function (data) {
  console.log(`上传错误！${JSON.stringify(data)} `);
});

module.exports = async function (config) {
  for (const c of config) {
    console.log(`> 节点 ${c.keyword[0]} ${c.host} 开始上传 <`);
    await ftpDeploy.deploy(c);
    console.log(`> 上传完成 <`);
  }
};
