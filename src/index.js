const Koa = require('koa');
const app = new Koa();

const logger = require('./logger');
const { sleep } = require('./utils');

app.use(logger.loggerMiddleware);

app.use(async ctx => {
  logger.info('waiting 1');
  await sleep(1);
  logger.info('waiting 2');
  await sleep(1);
  logger.info('waiting 3');

  ctx.body = 'Hello World';
});

app.listen(3000);