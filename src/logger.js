const { AsyncLocalStorage } = require('node:async_hooks');
const { v4: uuidV4 } = require('uuid');

const asyncLocalStorage = new AsyncLocalStorage();

function info(...args) {
  const traceId = asyncLocalStorage.getStore();
  console.log(`[${traceId}]`, ...args);
}

async function loggerMiddleware(ctx, next) {
  const traceId = uuidV4();
  console.log(`[${traceId}] request start`);
  const start = Date.now();
  await asyncLocalStorage.run(traceId, async () => await next());
  console.log(`[${traceId}] request spends ${Date.now() - start}ms`);
}

module.exports = {
  info,
  loggerMiddleware,
};
