const config = require('../config');

module.exports = async (ctx, next) => {
  // 连接数据库
  const knex = require('knex')(config.db);
  // 定义和创建数据表
  await knex.schema.createTableIfNotExists(config.dbName, function (table) {
    table.string('username');
    table.string('phone');
    table.string('adress1');
    table.string('adress');
    table.string('date');
    table.string('addr');
    table.string('dateNow');
    table.text('mu');
    table.string('server');
    table.string('times');
  })
    .then(function (res) {
      console.log("bulid feedback model success");
    })
    .catch(function (e) {
      console.error(e);
    });
  return knex;
};