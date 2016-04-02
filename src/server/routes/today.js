var router = require('koa-router')();
import Event from '../../google/event';

router.get('/', function(ctx, next){
  return Event.today().then(function(events){
    ctx.body = events;
  });
});

module.exports = router;
