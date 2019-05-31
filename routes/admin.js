const router = require('koa-router')();

router.prefix('/admin');

router.get('/', function (ctx, next) {
  ctx.render("admin/index")
});

module.exports = router;

