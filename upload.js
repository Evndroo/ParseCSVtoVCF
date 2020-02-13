const multer = require("multer")
const path = require("path")

module.exports ={
    storage: multer.diskStorage({
        destination:path.resolve("uploads"),
        filename:function(req, file, cb){
            let extension = path.extname(file.originalname)
            let name = path.basename(file.originalname, extension)
            cb(null,`${name}-${Date.now()}${extension}`)
        }
    }),
};