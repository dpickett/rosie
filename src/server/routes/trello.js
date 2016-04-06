import routerBase from 'koa-router';
import List from '../../trello/list';

const router = routerBase();
router.get('/:id.json', function (ctx, next) {
  return List.find(ctx.params.id).then(function(list){
    ctx.body = list;
  }).catch(function(err){
    ctx.body = err;
  });
});
module.exports = router;
