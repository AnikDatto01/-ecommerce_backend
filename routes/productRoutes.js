const expires =require("express")

const router = expires.Router()

const {createproduct,getAllProduct,getAllProducts} = require('../controllers/productController')

router.route('/createproduct').post(createproduct)

router.route('/getAllProduct').get(getAllProduct)

router.route('/getAllProducts').get(getAllProducts)

module.exports = router