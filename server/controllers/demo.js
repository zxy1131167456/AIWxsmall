
module.exports = ctx => {
  let data = JSON.stringify(ctx.request.url);
  let data1 = JSON.parse(data);
  // let data = JSON.parse(ctx);
  console.log(ctx.request);
  // var nong = parseInt(data.addr)*2;
  ctx.state.data = {
    // msg: data.mu*100+nong+"元"
    msg: data
  }
}
var mysql = require('mysql');

function OptPool() {
  this.falg = true; //是否连接过
  this.pool = mysql.createPool({
            host: 'localhost',
        port: 3306,
        user: 'root',
        db: 'cAuth',
        pass: 'knag.xyz',
        char: 'utf8mb4'
  });

  this.getPool = function () {
    if (this.falg) {
      //监听connection事件
      this.pool.on('connection', function (connection) {
        connection.query('select session auto_increment_increment');
        this.falg = false;
      })
    }

    return this.pool;
  }
}

module.exports = OptPool;