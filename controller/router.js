
const ProductRouting = require('./handle/productRouting')



const handler = {
    'home' : ProductRouting.showHome,
    'product/create' : ProductRouting.showFormCreate,
    'product/edit' : ProductRouting.showFormEdit,
    'product/delete' : ProductRouting.showFormDelete,
    'product/findByName' : ProductRouting.showFormFindByName,
    'product/detail' : ProductRouting.detailProduct


}


module.exports = handler