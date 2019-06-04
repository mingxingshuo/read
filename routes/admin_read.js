const router = require('koa-router')();

router.prefix('/admin_read');

router.all('/', async (ctx, next) => {
  await ctx.render("admin4/index")
});

router.all('/*', async (ctx, next) => {
  await ctx.render("admin4/index")
});

module.exports = router;