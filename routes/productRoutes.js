const expires =require("express")

const router = expires.Router()

const {createproduct,getAllProduct,getAllProducts,getProductBySlug} = require('../controllers/productController')

router.route('/createproduct').post(createproduct)

router.route('/getAllProduct').get(getAllProduct)

router.route('/getAllProducts').get(getAllProducts)

router.route('/getProductById/:id').get(getProductById);

module.exports = router