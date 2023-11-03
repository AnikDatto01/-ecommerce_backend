const prisma = require("../prisma/index");
const multer = require("multer"); // Import Multer
const path = require("path");
const { v4: uuidv4 } = require("uuid");

let filename = "";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadFolder = path.join(__dirname, "../public/slider");
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

exports.createSlider = async (req, res, next) => {
  console.log("fkgjfj")
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

      const { title, image, text,slug,status } = req.body;

      // const existingCategory = await prisma.slider.findUnique({
      //   where: {
      //     title: title,
      //   },
      // });

      if (1!==1) {
        return res.status(400).json({
          success: false,
          message: "Category with this name already exists.",
        });
      }

      const imagedata = `public/slider/${filename}`;

      const slider = await prisma.slider.create({
        data: {
          title,
          image: imagedata,
          text,
          status,
          slug
        },
      });

      res.json({
        success: true,
        code: 200,
        slider
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

exports.getAllSliders = async (req, res, next) => {
  const sliders = await prisma.slider.findMany();
  res.json(sliders);
};
