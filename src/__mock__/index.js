const Koa = require('koa');
const router = require('./routes');
const app = new Koa();
const { MOCK_PORT = 3352 } = process.env;

app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
  ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  await next();
});

app.use(router.routes());

app.listen(MOCK_PORT, () => {
  console.log(`mock 服务已开启，端口为: ${MOCK_PORT}`);
});
