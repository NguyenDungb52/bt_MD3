const  mysql = require('mysql')

class Connection {
  static  configToMySQL = {
        host : 'localhost',
        user : 'root',
        password : '123456',
        database : 'thi_thuc_hanh_MD3',
        charset : 'utf8_general_ci'
    }
   static getConnection(){
        return mysql.createConnection(Connection.configToMySQL)
    }
    static connecting(){
      Connection.getConnection().connect(error =>{
          if(error){
              console.log(error,'loi')
          }else {
              console.log('Tao lien ket thanh cong')
          }
      })
    }
}
module.exports = Connection