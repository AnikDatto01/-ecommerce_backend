const expires =require("express")

const router = expires.Router()

const {createSubcategory,getAllSubcategories} = require('../controllers/subcategoryController')

router.route('/createSubcategory').post(createSubcategory)

router.route('/getAllSubcategories').get(getAllSubcategories)

module.exports = router