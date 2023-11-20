const cookieParser =require('cookie-parser')
const express = require('express')
const cors = require('cors');
//need for image upload 
const path  =require( "path");

/////////////////////////////////////


require('dotenv').config()
const app = express()
app.use(cors({ origin: 'http://www.anikdutta.live' }));
//regular middelware
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//cookie middelware
app.use(cookieParser())



//importent///////////////////////////////////////
const  userRouter = require('./routes/useRoutes')
const  categoryRoutes = require('./routes/categoryRoutes')
const  subcategoryRoutes = require('./routes/subcategoryRoutes')
const  sliderRoutes = require('./routes/sliderRoutes')
const  brandRoutes = require('./routes/brandRoutes')
const  shopRoutes = require('./routes/shopRoutes')
const  productRoutes = require('./routes/productRoutes')




app.use('/api',userRouter)
app.use('/api',categoryRoutes)
app.use('/api',subcategoryRoutes)
app.use('/api',sliderRoutes)
app.use('/api',brandRoutes)
app.use('/api',shopRoutes)
app.use('/api',productRoutes)


app.use('/public/profileImage', express.static(path.join(__dirname, 'public/profileImage')));
app.use('/public/createcate', express.static(path.join(__dirname, 'public/createcate')));
app.use('/public/slider', express.static(path.join(__dirname, 'public/slider')));
app.use('/public/subcreatecate', express.static(path.join(__dirname, 'public/subcreatecate')));
app.use('/public/brand', express.static(path.join(__dirname, 'public/brand')));
app.use('/public/shop', express.static(path.join(__dirname, 'public/shop')));
app.use('/public/product', express.static(path.join(__dirname, 'public/product')));

app.get('/',(req,res)=>{
    res.send("hi i am anik")
})

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
