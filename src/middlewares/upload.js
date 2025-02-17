const path = require("path")
const multer = require("multer")

const storage = multer.diskStorage({
    destination: function (req, file, cd) {
        cd(null, "src/uploads/")
    },
    filename: function (req, file, cd) {
        let ext = path.extname(file.originalname)
        cd(null, Date.now() + ext)
    }
})

module.exports = multer({
    storage: storage,
    fileFilter: function (req, file, callback) {
        if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
            callback(null, true)
        } else {
            console.log("only jpg & png files supported!");
            callback(null, false)
        }
    },
    limits: {
        fileSize: 1024 * 1024 * 2
    }
})