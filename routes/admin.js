const router = require('koa-router')();

router.prefix('/admin');

router.all('/*', async (ctx, next) => {
  await ctx.render("admin/index")
});

module.exports = router;