网盘后端服务

使用pnpm包管理
下载依赖
pnpm install
在mysql数据库中建立名为pan的数据库提供数据支持
运行端口号3000
## 接口规范
返回数据的接口规范：

```json
{
  code: 200, // 10001 10002
  data: [], // {}
  message: 'error',
  page: {
    start: 0,
    length: 20,
    total: 100,
  },
  debug: '',
  key: '',
}
```


