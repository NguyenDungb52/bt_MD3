const  fs  = require('fs')

class NotFoundRouting{
  static  showNotFound(req,res){
        fs.readFile('./views/error/notFound.html','utf8',(err,data)=>{
            if(err){
                console.log(err,'loi')
            }else {
                res.writeHead(200,'text/html')
                res.write(data)
                res.end()
            }
        })
    }

}

module.exports = NotFoundRouting