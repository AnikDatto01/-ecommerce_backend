const prisma = require('../prisma/index');
const cookieToken = require('../utils/cookieTooken');
const md5 = require('md5');
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');


// const timestamp = Date.now();
//   const randomUUID = uuidv4();
//   const filename = `${timestamp}-${randomUUID}`;

let filename =''
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadFolder = path.join(__dirname, '../public/profileImage');
    cb(null, uploadFolder); // Destination folder for uploaded files
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); // Get the file extension
    const timestamp = Date.now();
const randomUUID = uuidv4();
 filename = `${timestamp}-${randomUUID}${ext}`;
    cb(null,  filename); // File name with timestamp
  },
});

const upload = multer({ storage: storage });

exports.signup = async (req, res) => {
  try {
    // Use multer middleware to handle the image upload
   
    upload.single('image')(req, res, async (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          success: false,
          message: 'Error uploading image',
          error: err.message,
        });
      }

      const {
        // Extract other user data from req.body
        userName,
        userPass,
        firstName,
        lastName,
        address,
        userEmail,
        userPhone,
        userType,
        userStatus,
        zone_divisions,
        zone_districts,
        zone_upazilas,
      } = req.body;

      const hashPassword = md5(userPass);
      const type = parseInt(userType);

      // Check if req.file is defined (image was uploaded)
      const imagedata = `public/profileImage/${filename}`;
      const user = await prisma.users.create({
        data: {
          userName,
          userPass: hashPassword,
          firstName,
          lastName,
          address,
          userEmail,
          userPhone,
          userType :type,
          userStatus,
          image : imagedata,
          zone_divisions,
          zone_districts,
          zone_upazilas,
        },
      });

      cookieToken(user, res);

      
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Error during signup',
      error: error.message,
    });
  }
};

// user signUp

// exports.signup = async (req, res) => {
//     try {
//         const { userName,
//             userPass,
//             firstName,
//             lastName,
//             address,
//             userEmail,
//             userPhone,
//             userType,
//             userStatus,
//             image,
//             zone_divisions,
//             zone_districts,
//             zone_upazilas } = req.body

//             const hashPassword = md5(userPass);

//         // if(!name || !email || !password){
//         //     throw new Error ("please provide all filed")
//         // }

//         console.log(hashPassword,"hashPassword")

//         const user = await prisma.users.create({
//             data: {
//                 userName,
//                 userPass :hashPassword,
//                 firstName,
//                 lastName,
//                 address,
//                 userEmail,
//                 userPhone,
//                 userType,
//                 userStatus,
//                 image,
//                 zone_divisions,
//                 zone_districts,
//                 zone_upazilas
//             }
//         })
//         console.log(user,"user")
//          cookieToken(user,res)
//     } catch (error) {
//         res.json({
//             success: false,
//             message: "gfhgfhgfhfg",
//           });
//     }
// } 





// user login

exports.login = async (req, res,next) => {
    try {
        const {userEmail, userPass} = req.body
        if(!userEmail || !userPass){
            throw new Error ("please provide all filed")
        }

        const user = await prisma.users.findMany({
            where: {
                userEmail: userEmail,
                userPass: md5(userPass),
              }
        })
        if (user.length !== 0) {
            cookieToken(user,res)
        }else{
            res.json({
                success: false,
                message: "user not found",
                code: 404
              });
        }
        
    } catch (error) {
        res.json({
            success: false,
            message: error,
          });
    }
}