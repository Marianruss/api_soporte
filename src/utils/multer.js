const { diskStorage } = require("multer")
const multer = require("multer")
const now = new Date().toLocaleDateString()

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, now.replaceAll("/",".") + '-' + file.originalname);
    }
});

// Create the multer instance
const upload = multer({ storage: storage });

module.exports = upload;
