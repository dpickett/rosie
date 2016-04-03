var router = require('koa-router')();
import Event from '../../google/event';

router.get('/', function(ctx, next){
  return Event.tomorrow().then(function(events){
    ctx.body = events;
  });
});

module.exports = router;
