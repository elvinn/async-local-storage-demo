const { AsyncLocalStorage } = require('node:async_hooks');
const { v4: uuidV4 } = require('uuid');

const asyncLocalStorage = new AsyncLocalStorage();

async function loggerMiddleware(ctx, next) {
  const traceId = uuidV4();
  console.log(`[${traceId}] request start`);
  const start = Date.now();
  await asyncLocalStorage.run(traceId, () => next());
  console.log(`[${traceId}] request spends ${Date.now() - start}ms`);
}

function info(...args) {
  const traceId = asyncLocalStorage.getStore();
  console.log(`[${traceId}]`, ...args);
}

module.exports = {
  loggerMiddleware,
  info,
};
