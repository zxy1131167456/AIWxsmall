const config = require('../config');
// 连接数据库
var knex = require('knex')({
  client: 'mysql',
  connection: {
    host : 'localhost',
    user : 'root',
    password : 'knag.xyz',
    database: 'Agriculture'
  },
  useNullAsDefault: true
});
module.exports = async(ctx, next) => {
  // ctx是对应koa的，res是对应knex的
  console.log(ctx.request.body);
  let advice = {
    username: ctx.request.body.username,
    phone: ctx.request.body.phone,
    adress1: ctx.request.body.adress1,
    adress: ctx.request.body.adress,
    date: ctx.request.body.date,
    times: ctx.request.body.times,
    mu: ctx.request.body.mu,
    addr: ctx.request.body.addr,
    server: ctx.request.body.server,
    dateNow: ctx.request.body.dateNow
  };
  await knex('online').insert({
    username: ctx.request.body.username,
    phone: ctx.request.body.phone,
    address1: ctx.request.body.adress1,
    address: ctx.request.body.adress,
    appointmentDate: ctx.request.body.date,
    appointmentTime: ctx.request.body.times,
    area: ctx.request.body.mu,
    crop: ctx.request.body.addr,
    service: ctx.request.body.server.join(","),
    dateNow: ctx.request.body.dateNow
  })
  // await knex('online').insert({
  //   name: ctx.request.body.username,
  //   phone: ctx.request.body.phone,
  //   address: ctx.request.body.adress1,
  //   area: ctx.request.body.mu,
  //   crop: ctx.request.body.addr,
  //   service: ctx.request.body.server,
  //   date: ctx.request.body.dateNow,
  // })
    .catch(function (e) {
      return ctx.respoon.body = e;
      console.error(e);
    })
    .then(
    console.log("feedback columns insert success"),
    );
  // var id = knex.column(max(id)).select().from('online')
  console.log(advice);
  return ctx.response.body = ctx.request.body.server;
}

