const prisma = require("../prisma/index");
const multer = require("multer"); // Import Multer
const path = require("path");
const { v4: uuidv4 } = require("uuid");

let filename = "";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadFolder = path.join(__dirname, "../public/product");
    cb(null, uploadFolder); // Destination folder for uploaded files
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); // Get the file extension
    const timestamp = Date.now();
    const randomUUID = uuidv4();
    filename = `${timestamp}-${randomUUID}${ext}`;
    cb(null, filename); // File name with timestamp
  },
});

const upload = multer({ storage: storage });

exports.createproduct = async (req, res, next) => {
  try {
    upload.single("image")(req, res, async (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          success: false,
          message: "Error uploading image",
          error: err.message,
        });
      }

      const { name,description,regular_price,sale_price,coupon_discount,coupon,quntity,active_status,category,subcategory,brand,shop,new_arrival,video,selling_record, image, slug } = req.body;

      // const existing = await prisma.shop.findUnique({
      //   where: {
      //     name: name,
      //   },
      // });

      // if (existing) {
      //   return res.status(400).json({
      //     success: false,
      //     message: "Category with this name already exists.",
      //   });
      // }

      const imagedata = `public/product/${filename}`;

      const product = await prisma.product.create({
        data: {
          name,
          description,
          regular_price:parseInt(regular_price),
          sale_price:parseInt(sale_price),
          coupon_discount:parseInt(coupon_discount),
          coupon,
          quntity:parseInt(quntity),
          active_status,
          category,
          subcategory,
          brand,
          shop,
          new_arrival,
          video,
          selling_record:parseInt(selling_record),
          image: imagedata,
          slug,
        },
      });

      res.json({
        success: true,
        code: 200,
        product,
      });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error during signup",
      error: error.message,
    });
  }
};

exports.getAllProduct = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1; // Current page (default to 1)
    const pageSize = parseInt(req.query.pageSize) || 10; // Number of products per page (default to 10)

    // Calculate the offset based on the page and pageSize
    const offset = (page - 1) * pageSize;

    // Query the database for a subset of products based on pagination parameters
    const products = await prisma.product.findMany({
      skip: offset,
      take: pageSize,
    });

    // Calculate the total number of products
    const totalProducts = await prisma.product.count();

    // Create an object that includes the list of products, total count, and pagination information
    const responseData = {
      products: products,
      total: totalProducts,
      page: page,
      pageSize: pageSize,
    };

    // Send the response as JSON
    res.json(responseData);
  } catch (error) {
    // Handle errors, e.g., by passing them to the error handling middleware
    next(error);
  }
};

exports.getAllProducts = async (req, res, next) => {
  const product = await prisma.product.findMany()
  res.json(product);
};
