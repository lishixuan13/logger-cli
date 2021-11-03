const { logger } = require("../lib");

// logger.countTime.start / logger.countTime.end 记录时间并转换为： time ms/ time s
logger.countTime.start();

logger.log("log message");

logger.info("info message");

logger.success("success message");

logger.warn("warn message");

logger.error(new Error("Foo"));

// 参考 progress 库
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
