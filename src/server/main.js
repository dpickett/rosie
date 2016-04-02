const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')();
const views = require('koa-views');
const co = require('co');
const convert = require('koa-convert');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser')();
const path = require('path');
const logger = require('koa-logger');

const index = require('./routes/index');
const today = require('./routes/today');

import _debug from 'debug';
import config from '../../config';
import serve from 'koa-static';
import webpack from 'webpack';
import webpackConfig from '../../webpack.config'
import webpackDevMiddleware from './middleware/webpack-dev'
import webpackHMRMiddleware from './middleware/webpack-hmr'

const paths = config.utils_paths

// middlewares
app.use(convert(bodyparser));
app.use(convert(json()));
app.use(convert(logger()));
app.use(convert(require('koa-static')(__dirname + '/public')));

// ------------------------------------
// Apply Webpack HMR Middleware
// ------------------------------------
if (config.env === 'development') {
  const compiler = webpack(webpackConfig)

  // Enable webpack-dev and webpack-hot middleware
  const { publicPath } = webpackConfig.output

  app.use(webpackDevMiddleware(compiler, publicPath))
  app.use(webpackHMRMiddleware(compiler))

  // Serve static assets from ~/src/static since Webpack is unaware of
  // these files. This middleware doesn't need to be enabled outside
  // of development since this directory will be copied into ~/dist
  // when the application is compiled.
  app.use(convert(serve(paths.client('static'))))
} else {
  debug(
    'Server is being run outside of live development mode. This starter kit ' +
    'does not provide any production-ready server functionality. To learn ' +
    'more about deployment strategies, check out the "deployment" section ' +
    'in the README.'
  )

  // Serving ~/dist by default. Ideally these files should be served by
  // the web server and not the app server, but this helps to demo the
  // server in production.
  app.use(convert(serve(paths.base(config.dir_dist))))
}


app.use(co.wrap(function *(ctx, next){
  ctx.render = co.wrap(ctx.render);
  yield next();
}));

// logger

app.use(co.wrap(function *(ctx, next){
  const start = new Date;
  yield next();
  const ms = new Date - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
}));

router.use('/', index.routes(), index.allowedMethods());
router.use('/today.json', today.routes(), today.allowedMethods())

app.use(router.routes(), router.allowedMethods());
// response

app.on('error', function(err, ctx){
  log.error('server error', err, ctx);
});

module.exports = app;
