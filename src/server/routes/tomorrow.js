var router = require('koa-router')();
import Event from '../../google/event';
import EventSerializer from '../models/event-serializer';

router.get('/', function(ctx, next){
  return Event.tomorrow().then(function(events){
    ctx.body = events.map((event) => {
      const e = new EventSerializer(event);
      return e.serialize();
    });
  });
});

module.exports = router;
