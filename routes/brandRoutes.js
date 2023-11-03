const expires =require("express")

const router = expires.Router()

const {createbrand,getAllBrand} = require('../controllers/brandController')

router.route('/createbrand').post(createbrand)

router.route('/getAllBrand').get(getAllBrand)

module.exports = router