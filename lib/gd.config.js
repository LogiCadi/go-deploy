// https://www.npmjs.com/package/go-deploy
module.exports = {
  servers: [
    {
      keyword: ["开发环境", "dev", "开发"],
      host: "10.618.72.5",
      user: "user",
      password: "password",
      port: 2233,
    },
    {
      keyword: ["测试环境", "test", "测试"],
      host: "120.76.50.187",
      user: "user",
      password: "password",
      port: 2233,
    },
  ],

  localRoot: __dirname + "/dist",
  remoteRoot: "/",

  include: ["*", "**/*"], // this would upload everything except dot files
  // include: ["*.php", "dist/*", ".*"],
  // e.g. exclude sourcemaps, and ALL files in node_modules (including dot files)
  exclude: [
    "dist/**/*.map",
    "node_modules/**",
    "node_modules/**/.*",
    ".git/**",
  ],
  // delete ALL existing files at destination before uploading, if true
  deleteRemote: false,
  // Passive mode is forced (EPSV command is not sent)
  forcePasv: true,
  // use sftp or ftp
  sftp: false,
};
