const Connection = require('/Users/nguyenvandung/WebstormProjects/ThiThucHanhMD3/model/connection.js')
 Connection.connecting()

class ProductService{
    static getProduct(){
        let connection = Connection.getConnection()
        return new Promise((resolve, reject)=>{
            connection.query(`SELECT * FROM product`,(err,products)=>{
                if(err){
                    reject(err,'loi')
                }else {
                    resolve(products)
                }
            })
        })

    }

    static saveProduct(product) {
        let connection = Connection.getConnection()
        return new Promise((resolve, reject)=>{
            connection.query(`insert into product(city, country, area, population, GDP, description)  values
                            ('${product.city}','${product.country}',${product.area},${product.population},${product.GDP},'${product.description}')`,(err,products)=>{
                if(err){
                    reject(err,'loi')
                }else {
                    console.log('Tao Homestay moi thanh cong')
                    resolve(products)
                }
            })
        })
    }

    static  findByID(id){
        let connection = Connection.getConnection()
        return new Promise((resolve, reject)=>{
            connection.query(`SELECT * FROM product where id = ${+id}`,(err,products)=>{
                if(err){
                    reject(err,'loi')
                }else {
                    resolve(products)
                }
            })
        })
    }

    static detailProduct(name){
        let connection = Connection.getConnection()
        return new Promise((resolve, reject)=>{
            connection.query(`SELECT * FROM  product where name = ${name}`,(err,products)=>{
                if(err){
                 reject(err)
                }else {
                    resolve(products)
                }
            })
        })
    }

    static editProduct(product,id) {
        let connection = Connection.getConnection()
        return new Promise((resolve, reject)=>{
            connection.query(`UPDATE product set city = '${product.city}', country = '${product.country}', area = ${product.area}, population = ${product.population}, GDP = ${product.GDP}, description = '${product.description}' where id =${id} `,(err,products)=>{
                if(err){
                    reject(err,'loi')
                }else {
                    console.log('Tao Homestay moi thanh cong')
                    resolve(products)
                }
            })
        })
    }

    static deleteProduct(id){
        let connection = Connection.getConnection()
        connection.query(`DELETE  FROM  product where id= ${+id}`,(err)=>{
            if(err){
                console.log(err,'loi')
            }else {
                console.log('xoa thanh cong')
            }
        })
    }

    static findByName(name){
        let connection = Connection.getConnection()
        return new Promise((resolve, reject)=>{
            connection.query(`SELECT * FROM  product where name like '%${name}%'`, (err,results)=>{
                    if(err){
                        reject(err,'loi')
                    }else {
                        resolve(results)
                    }
            })
        })


    }
}
module.exports = ProductService