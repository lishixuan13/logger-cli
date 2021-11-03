# logger

## 简介

一个简单的 logger CLI 命令行库

- 进度条
- loading
- 耗时
- 成功/失败/警告等 log

![CLI](https://qiniu-image.qtshe.com/1635755046583_939.png)

```javascript
const { logger } = require("logger-cli");

// logger.countTime.start / logger.countTime.end 记录时间并转换为： time ms/ time s
logger.countTime.start();

// 参考 chalk 库
logger.chalk;

logger.log("log message");

logger.info("info message");

logger.success("success message");

logger.warn("warn message");

logger.error(new Error("Foo"));

// 参数和返回值，参考 progress 库
logger.progress("build", 3);

logger.tick(1);

setTimeout(() => {
  logger.tick(1);
}, 500);

setTimeout(() => {
  logger.tick(1);
}, 1000);

logger.success(`build：${logger.countTime.end()}`);

logger.loading("loading ... ");
logger.stopLoading();


logger.silent = true // 禁用输出log
logger.info('被关闭的log')
logger.silent = false // 启用log
```
