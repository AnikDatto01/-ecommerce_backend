const prisma = require('../prisma/index')
const multer = require("multer"); // Import Multer
const path = require("path");
const { v4: uuidv4 } = require("uuid");


let filename = "";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadFolder = path.join(__dirname, "../public/subcreatecate");
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

exports.createSubcategory =async(req, res) => {

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

      const { name, image, slug ,categoryId} = req.body;

      const convertCategoryId = parseInt(categoryId);
      const imagedata = `public/subcreatecate/${filename}`;
      const category = await prisma.subcategory.create({
        data: {
          name,
          image: imagedata,
          slug,
          categoryId : convertCategoryId,
        },
      });

      res.json({
        success: true,
        code: 200,
        category,
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
  }


exports.getAllSubcategories =async(req, res) =>{
    // Get all subcategories
    const subcategories = await prisma.subcategory.findMany()
    res.json(subcategories);
  }