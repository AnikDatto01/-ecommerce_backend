const expires =require("express")

const router = expires.Router()

const {createSlider,getAllSliders} = require('../controllers/slider')

router.route('/createSlider').post(createSlider)

 router.route('/getAllSliders').get(getAllSliders)

module.exports = router