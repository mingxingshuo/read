const router = require('koa-router')();

router.prefix('/readAdmin');

router.all('/*', async (ctx, next) => {
  await ctx.render("admin4/index")
});

module.exports = router;