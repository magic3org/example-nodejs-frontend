const util = require('util')

class BaseDb {
  constructor (pool) {
    this.pool = pool
  }
  selectRecord (query, params, callback) {
    try {
      this.pool.getConnection((err, connection) => {
        if (err) {
          const errCode = 10
          log.dbError(err, errCode)
          return callback(true)
        }
        connection.query(query, params, (err, result) => {
          connection.release()
          if (err) {
            const errCode = 11
            const optionMessage = 'クエリー実行エラー'
            const optionObj = { query: query, params: params }
            log.dbError(err, errCode, optionMessage, optionObj)
            return callback(true)
          }
          callback(false, result)
        })
      })
    } catch (err) {
      const errCode = 12
      log.dbError(err, errCode)
      return callback(true)
    }
  }
  async asyncSelectRecord (query, params, callback) {
    console.log('asyncSelectRecord')
    try {
      /*var results = await this.pool.query(query, params, (err, result) => {
        this.pool.end()
        if (err) {
          const errCode = 20
          log.dbError(err, errCode)
          return callback(true)
        }
        callback(false, result)
      })*/
      //var results = await this.pool.query(query, params)
      /*await this.pool.query(query, function (error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', results[0].solution);
      })*/

     
        console.log(query)
        /*await this.pool.query(query, function (error, results, fields) {
          if (error) throw error;
          console.log('The solution is: ', results);
          return callback(true)
        })*/
        this.pool.query = util.promisify(this.pool.query)
        var records = await this.pool.query(query)
        // this.pool.end()

      console.log(records)
      // this.pool.end()
      console.log('wait end....')
    } catch (err) {
      const errCode = 21
      log.dbError(err, errCode)
      return callback(true)
    }
  }
  close () {
    this.pool.end(function (err) {
      if (err) {
        const errCode = 13
        log.dbError(err, errCode)
      }
      // close all connections
    })
  }
}
module.exports = BaseDb
