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
import config from '../config';
import session from 'koa-generic-session';

const bodyParser = bodyParserBase();
const app = new Koa();

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

import 'babel-polyfill';

const paths = config.utils_paths

// middlewares
app.use(convert(bodyParser));
app.use(convert(logger()));

app.keys = [config.secret_key_base];
app.use(convert(session()));

app.use(convert(json()));
console.log("serving " + config.path_base + '/public');
app.use(convert(serve(config.path_base + '/public')));

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
  // app.use(convert(serve(paths.client('static'))))
} else {
  // Serving ~/dist by default. Ideally these files should be served by
  // the web server and not the app server, but this helps to demo the
  // server in production.
  // app.use(convert(serve(paths.base(config.dir_dist))))
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

import passport from './lib/auth';
app.use(passport.initialize());
app.use(passport.session());

const router = new routerBase();
router.use('/require-sign-in', requireSignIn.routes(), requireSignIn.allowedMethods());

// response
app.on('error', function(err, ctx){
  log.error('server error', err, ctx);
})

router.get('/auth/github',
  passport.authenticate('github', {
    scope: ['profile', 'email']
  })
);

router.get('/auth/github/callback', function(ctx, next){
  return passport.authenticate('github', function(user, info, status) {
    if (user) {
      ctx.logIn(user);
      ctx.redirect('/');
    } else {
      ctx.redirect('/require-sign-in');
    }
  })(ctx, next);
});

app.use(router.routes(), router.allowedMethods());

const securedRouter = new routerBase()

securedRouter.use(function(ctx, next) {
  if (ctx.passport.user) {
    return next();
  } else {
    if(ctx.request.accepts('json')){
      ctx.type = 'json';
      ctx.status = 401;
      ctx.body = 'access denied';
    }
    else {
      ctx.redirect('/require-sign-in');
    }
  }
});

securedRouter.use('/trello', trelloRoutes.routes(), trelloRoutes.allowedMethods());
securedRouter.use('/today.json', today.routes(), today.allowedMethods());

app.use(securedRouter.routes(), securedRouter.allowedMethods());

module.exports = app;
