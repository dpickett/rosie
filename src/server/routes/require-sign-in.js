import routerBase from 'koa-router';

const router = routerBase();

router.get('/', function(ctx, next){
  ctx.type = 'html';
  ctx.body = 'You must <a href="/auth/github">sign in</a>';
});

export default router;
