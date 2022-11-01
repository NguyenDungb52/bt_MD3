const fs = require('fs')
const qs = require('qs')
const url = require('url')
const ProductService = require('/Users/nguyenvandung/WebstormProjects/ThiThucHanhMD3/service/productService.js')

class ProductRouting{
   static getHtmlProduct(products,indexHtml){
        let tbody = ''
        products.map((product,index)=>{
            tbody += `<tr>
                <th scope="row">${index + 1}</th>
                <td><a href="product/detail/${product.id}"> ${product.city}</a></td>
                <td>${product.country}</td>

                <td><a href="product/edit/${product.id}"> EDIT</a>  </td>
                 <td><a href="product/delete/${product.id}"> DELETE</a>  </td>
            </tr>`
        })
        indexHtml = indexHtml.replace('{products}',tbody)
        return indexHtml
    }

     static showHome (req,res){
       if(req.method === "GET"){
           const query = qs.parse(url.parse(req.url).query)
           fs.readFile('./views/index.html','utf8',async (err,indexHtml)=>{
               if(err){
                   console.log('loi')
               }else {
                   let product;
                   if(query.search){
                       console.log(query.search,'okokoko')
                       product = await ProductService.findByName(query.search)
                   }else {
                       product = await ProductService.getProduct()
                   }
                   indexHtml = ProductRouting.getHtmlProduct(product,indexHtml)
                   res.writeHead(200,'text/html')
                   res.write(indexHtml)
                   res.end()
               }
           })
       }

    }

    static showFormCreate (req,res){
       if(req.method === "GET"){
           fs.readFile('./views/product/create.html','utf8',async (err,indexHtml)=>{
               if(err){
                   console.log('loi')
               }else {
                   res.writeHead(200,'text/html')
                   res.write(indexHtml)
                   res.end()
               }
           })
       }else {
           let productChunk  = ''
           req.on('data',chunk =>{
               productChunk += chunk
           })
           req.on('end', async (err)=>{
               if(err){
                   console.log(err,'loi')
               }else {
                   let product = qs.parse(productChunk)
                   await ProductService.saveProduct(product)
                   res.writeHead(301,{'location' : '/home'})
                   res.end()
               }
           })
       }
    }

    static showFormEdit (req,res,id){
        if(req.method === "GET"){
            fs.readFile('./views/product/edit.html','utf8',async (err,editHtml)=>{
                if(err){
                    console.log('loi')
                }else {
                    let product = await ProductService.findByID(id)
                    editHtml = editHtml.replace("{city}",product[0].city)
                    editHtml = editHtml.replace("{country}",product[0].country)
                    editHtml = editHtml.replace("{area}",product[0].area)
                    editHtml = editHtml.replace("{population}",product[0].population)
                    editHtml = editHtml.replace("{GDP}",product[0].GDP)
                    editHtml = editHtml.replace("{description}",product[0].description)
                    res.writeHead(200,'text/html')
                    res.write(editHtml)
                    res.end()
                }
            })
        }else {
            let productChunk  = ''
            req.on('data',chunk =>{
                productChunk += chunk
            })
            req.on('end', async (err)=>{
                if(err){
                    console.log(err,'loi')
                }else {
                    let product = qs.parse(productChunk)
                    await ProductService.editProduct(product,id)
                    res.writeHead(301,{'location' : '/home'})
                    res.end()
                }
            })
        }
    }

        static  detailProduct(req,res,id){
       if(req.method === "GET"){
           fs.readFile('./views/product/detail.html','utf8',async (err,detailHtml)=>{
               if(err){
                   console.log(err)
               }else {

                   let product = await ProductService.findByID(id)
                   console.log(product)
                   detailHtml = detailHtml.replace("{city}",product[0].city)
                   detailHtml = detailHtml.replace("{country}",product[0].country)
                   detailHtml = detailHtml.replace("{area}",product[0].area)
                   detailHtml = detailHtml.replace("{population}",product[0].population)
                   detailHtml = detailHtml.replace("{GDP}",product[0].GDP)
                   detailHtml = detailHtml.replace("{description}",product[0].description)
                   res.writeHead(200,'text/html')
                   res.write(detailHtml)
                   res.end()
               }
           })
       }
        }
    static showFormDelete(req,res,id){
       if(req.method === "GET"){
           fs.readFile('./views/product/delete.html','utf8',async (err,data)=>{
               if(err){
                   console.log(err,'loi')
               }else {
                   await ProductService.findByID(id)
                   res.writeHead(200,'text/html')
                   res.write(data)
                   res.end()
               }
           })
       }else {
            ProductService.deleteProduct(+id)
           res.writeHead(301, {'location' : '/home'})
           res.end()
       }
    }

    static showFormFindByName(req,res,name){
        if (req.method === "GET") {
            fs.readFile('./views/product/findByName.html', 'utf8', async (err, indexHTML) => {
                if (err) {
                    console.log(err, 'loi')
                } else {
                    await ProductService.findByName(name)
                    res.writeHead(200, 'text/html')
                    res.write(indexHTML)
                    res.end()
                }
            })
        } else {
            ProductService.findByName(name)
            res.writeHead(301, {'location': '/home'})
            res.end()
        }
    }


}

module.exports = ProductRouting