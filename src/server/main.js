require('babel-core/register')

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

webpackDevServer = require('koa-webpack-dev');

const index = require('./routes/index');
const today = require('./routes/today');



// middlewares
app.use(convert(bodyparser));
app.use(convert(json()));
app.use(convert(logger()));
app.use(convert(require('koa-static')(__dirname + '/public')));

if(process.env.NODE_ENV === 'development') {
  app.use(convert(webpackDevServer({
    config: './webpack.config.js',
    webRoot: __dirname + '../public',
    log: {
      level: 'info'
    }
  })));
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

// Start app
if (!module.parent) {
  app.listen(process.env.PORT || 3000);
}


module.exports = app;
