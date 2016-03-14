var router = require('koa-router')();
import Event from '../google/event'

router.get('/', function(ctx, next){
  ctx.body = Event.today();
});

module.exports = router;
