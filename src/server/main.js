import Koa from 'koa';
import routerBase from 'koa-router';
import views from 'koa-views';
import co from 'co';
import convert from 'koa-convert';
import json from 'koa-json';
import onerror from 'koa-onerror';
import bodyParserBase from 'koa-bodyparser';
import path from 'path';
import logger from 'koa-logger';
import config from '../../config';
import session from 'koa-generic-session';

const bodyParser = bodyParserBase();
const app = new Koa();
const router = routerBase();

import index from './routes/index';
import today from './routes/today';
import trelloRoutes from './routes/trello';
import requireSignIn from './routes/require-sign-in';

import _debug from 'debug';
import serve from 'koa-static';
import webpack from 'webpack';
import webpackConfig from '../../webpack.config'
import webpackDevMiddleware from './middleware/webpack-dev'
import webpackHMRMiddleware from './middleware/webpack-hmr'

const paths = config.utils_paths

// middlewares
app.use(convert(bodyParser));
app.use(convert(logger()));

app.keys = [config.secret_key_base];
app.use(convert(session()));

app.use(convert(json()));
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
router.use('/require-sign-in', requireSignIn.routes(), requireSignIn.allowedMethods());
router.use('/today.json', today.routes(), today.allowedMethods());
router.use('/trello', trelloRoutes.routes(), trelloRoutes.allowedMethods());


app.use(router.routes(), router.allowedMethods());
// response
app.on('error', function(err, ctx){
  log.error('server error', err, ctx);
})

import passport from './lib/auth';
app.use(passport.initialize());
app.use(passport.session());

let authRouter = new routerBase();
authRouter.get('/auth/github',
  passport.authenticate('github', {
    scope: ['profile', 'email']
  })
);

// authRouter.get('/auth/google',
  // passport.authenticate('google', {
    // scope: ['profile', 'email']
  // })
// )

// authRouter.get('/auth/google/callback', function(ctx, next){
  // return passport.authenticate('google', function(user, info, status) {
    // console.log(user);
    // console.log(info);
    // ctx.type = 'json'
    // if (user === false) {
      // ctx.status = 401
      // ctx.body = { success: false }
    // } else {
      // ctx.body = { success: true }
      // return ctx.login(user)
    // }
  // })(ctx, next);
// });

authRouter.get('/auth/github/callback', function(ctx, next){
  return passport.authenticate('github', function(user, info, status) {
    if (user) {
      ctx.redirect('/');
    } else {
      ctx.redirect('/require-sign-in');
    }
  })(ctx, next);
});


app.use(authRouter.middleware());

module.exports = app;
