const prisma = require("../prisma/index");
const multer = require("multer"); // Import Multer
const path = require("path");
const { v4: uuidv4 } = require("uuid");

let filename = "";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadFolder = path.join(__dirname, "../public/brand");
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

exports.createbrand = async (req, res, next) => {
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

      const { name, image, slug } = req.body;

      const existing = await prisma.brand.findUnique({
        where: {
          name: name,
        },
      });

      if (existing) {
        return res.status(400).json({
          success: false,
          message: "Category with this name already exists.",
        });
      }

      const imagedata = `public/brand/${filename}`;

      const brand = await prisma.brand.create({
        data: {
          name,
          image: imagedata,
          slug,
        },
      });

      res.json({
        success: true,
        code: 200,
        brand,
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

exports.getAllBrand = async (req, res, next) => {
  const brand = await prisma.brand.findMany()
  res.json(brand);
};
