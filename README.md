# Proxy-Web
- required `NodeJS>=18`,`pnpm>=9`
- 通过你的域名代理某个web页面
- 支持子路径配置
## 使用方法
1. clone 项目
```shell
git clone https://github.com/lc-cn/proxy-web.git
cd proxy-web
```
2. install 依赖
```shell
pnpm install
```
3. 启动项目

- 你可以时使用环境变量 `PORT` (默认：3000)和 `DEPLOY_PATH`(默认：空)指定服务启动端口和部署的子路径
```shell
npm start
```
4. 使用服务
- 将需要代理的链接的 host 换成 你启动host服务，并用`proxy-host`参数声明原来的host

```diff
- https://example.com/path/to/page?param=value
+ http://localhost:3000/path/to/page?param=value&proxy-host=example.com
```

## 参数选项
以下是支持的参数配置
- `proxy-host`: 需要代理的 `hostname`
- `proxy-protocol`:协议，默认为当前 `protocol`
- `proxy-port`:端口,默认为当前`port`
