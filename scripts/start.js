const fs = require('fs');
const cp = require('child_process');
const os = require('os');
const path = require('path');
const Koa = require('koa');
const static = require('koa-static');
const proxy = require('koa-proxies');
const koaWebpack = require('koa-webpack');
const { historyApiFallback } = require('koa2-connect-history-api-fallback');
const compress = require('koa-compress');

const appDirectory = fs.realpathSync(process.cwd());

const {
  HOST_URL = 'http://127.0.0.1:3351',
  APP_PORT = 3350,
  MOCK_URL = `http://127.0.0.1:3352`,
  ENVIRONMENT_MODE = 'dev',
} = process.env;
const isDev = ENVIRONMENT_MODE === 'dev';
const server = new Koa();
server.use(
  compress({
    threshold: 1024,
    gzip: {
      flush: require('zlib').Z_SYNC_FLUSH,
    },
    deflate: {
      flush: require('zlib').Z_SYNC_FLUSH,
    },
    br: false,
  }),
);
const staticPath = appDirectory + '/dist';

server.use(historyApiFallback({ whiteList: ['/api/*'] }));
server.use(static(staticPath));

server.use(
  proxy('/api/mock/(.*)', {
    target: MOCK_URL,
    changeOrigin: true,
    logs: true,
    secure: false,
  }),
);

server.use(
  proxy('/api/(.*)', {
    target: HOST_URL,
    changeOrigin: true,
    logs: true,
    secure: false,
  }),
);

function getIPAdress() {
  const interfaces = os.networkInterfaces();
  for (const devName in interfaces) {
    const iface = interfaces[devName];
    for (let i = 0; i < iface.length; i++) {
      const alias = iface[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        return alias.address;
      }
    }
  }
}

if (isDev) {
  const webpackConfig = require(path.join(appDirectory, 'config', 'webpack.dev.config.js'));
  koaWebpack({
    config: webpackConfig,
    devMiddleware: {
      stats: {
        children: false,
        chunks: false,
        chunkGroups: false,
        chunkModules: false,
        chunkOrigins: false,
        entrypoints: false,
        modules: false,
        reasons: false,
        assets: false,
        hash: false,
        chunkOrigins: false,
        performance: false,
      },
    },
  }).then((middleware) => {
    server.use(middleware);
  });
} else {
  server.use(async (ctx, next) => {
    if (ctx.request.path.indexOf('/api') === -1) {
      ctx.set('Cache-Control', 'public');
    } else {
      ctx.set('Cache-Control', 'no-store, no-cache, must-revalidate');
    }
    ctx.set('max-age', 7200);
    await next();
  });
}

server.listen(APP_PORT, () => {
  console.log(`ApiHostUrl: ${HOST_URL}, ApiMockUrl: ${MOCK_URL}`);
  console.log(`App running at: http://localhost:${APP_PORT}`);
  console.log(`- Local: http://localhost:${APP_PORT}`);
  console.log(`- Network: http://${getIPAdress()}:${APP_PORT}`);
  if (isDev) {
    switch (process.platform) {
      case 'darwin':
        cp.exec(`open http://localhost:${APP_PORT}`);
        break;
      case 'win32':
        cp.exec(`start http://localhost:${APP_PORT}`);
        break;
      default:
        cp.exec(`open http://localhost:${APP_PORT}`);
    }
  }
});
