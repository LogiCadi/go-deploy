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

  localRoot: "dist",
  remoteRoot: "/",
};
