var router = require('koa-router')();

router.get('/', function (ctx, next) {
  ctx.body = {foo: 'bar'};
})
module.exports = router;
