const expires =require("express")

const router = expires.Router()

const {createcategory,getAllCategories} = require('../controllers/categoryController')

router.route('/createcategory').post(createcategory)

router.route('/getAllCategories').get(getAllCategories)

module.exports = router