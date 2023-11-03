const expires =require("express")

const router = expires.Router()

const {createshop,getAllShop} = require('../controllers/shopController')

router.route('/createshop').post(createshop)

router.route('/getAllShop').get(getAllShop)

module.exports = router