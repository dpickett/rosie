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
import session from 'koa-session';

const bodyParser = bodyParserBase();
const app = new Koa();
const router = routerBase();

app.keys = [config.secret_key_base];
app.use(convert(session({}, app)));

import passport from 'koa-passport';

app.use(passport.initialize());
app.use(passport.session());

import { Strategy as GoogleStrategy } from 'passport-google-oauth2';

passport.use(new GoogleStrategy({
    clientID:     process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
));

passport.serializeUser(function(user, done) {
  return done(null, user);
});

passport.deserializeUser(function(user, done) {
  return done(null, user);
});

let authRouter = new routerBase();
authRouter.get('/auth/google',
  passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/plus.login']
  })
);

// authRouter.get('/auth/google/callback', passport.authenticate('google', {
    // failureRedirect: '/require-sign-in',
    // successRedirect: '/'
  // })
// );

app.use(authRouter.middleware());

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

// Require authentication for now
// app.use(function(ctx, next) {
  // if (ctx.isAuthenticated()) {
    // return next();
  // } else {
    // let signInPath = '/require-sign-in';
    // if(ctx.request.url != signInPath && !ctx.request.url.match(/\/auth\//)){
      // ctx.redirect(signInPath);
    // }
    // else {
      // return next();
    // }
  // }
// })

router.use('/', index.routes(), index.allowedMethods());
router.use('/require-sign-in', requireSignIn.routes(), requireSignIn.allowedMethods());
router.use('/today.json', today.routes(), today.allowedMethods());
router.use('/trello', trelloRoutes.routes(), trelloRoutes.allowedMethods());


app.use(router.routes(), router.allowedMethods());
// response

app.on('error', function(err, ctx){
  log.error('server error', err, ctx);
});

module.exports = app;
