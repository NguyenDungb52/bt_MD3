
 const http = require('http')
 const  handle = require('./controller/router')
 const url = require('url')
 const NotFoundRouting = require('./controller/handle/notFoundRouting')


 function getUrl (req){
   const urlParse = url.parse(req.url,true)
  const pathName  = urlParse.pathname
  return pathName.split('/')
 }


 const  server = http.createServer((req,res)=>{
  const arrPath = getUrl(req)
  let trimPath = ''
  if(arrPath.length > 2) {
    trimPath = arrPath[1] + '/' + arrPath[2]
  }else {
   trimPath = arrPath[arrPath.length - 1]
  }
  let chosenHandle ;
  if(typeof handle[trimPath] === 'undefined' ){
     chosenHandle = NotFoundRouting.showNotFound
  }else {
    chosenHandle = handle[trimPath]
  }

  chosenHandle(req,res,arrPath[3])
 })
 server.listen(3000,()=>{
     console.log('Server chay 8080')
 })
