const router = require('koa-router')();

router.prefix('/admin');

router.use('/*', function (ctx, next) {
  ctx.render("admin/index")
});

module.exports = router;

