const config = require('../config');
// 连接数据库
var knex = require('knex')({
  client: 'mysql',
  connection: {
    host: 'localhost',
    user: 'root',
    password: 'knag.xyz',
    database: 'Agriculture'
  },
  useNullAsDefault: true
});
module.exports = async (ctx, next) => {
  // ctx是对应koa的，res是对应knex的
  console.log(ctx.request.body);
  await knex('carts').insert({
    username: ctx.request.body.username,
    phone: ctx.request.body.phone,
    address1: ctx.request.body.address1.join("-"),
    address2: ctx.request.body.address2,
    cart: ctx.request.body.cart,
    dateNow: ctx.request.body.dateNow
  })
    .catch(function (e) {
      return ctx.respoon.body = e;
      console.error(e);
    })
    .then(
    console.log("feedback columns insert success"),
  );
  // var id = knex.column(max(id)).select().from('online')
  console.log(advice);
  return ctx.response.body = ctx.request.body;
}

