const Router = require("express")
const bodyParser = require("body-parser")
const uploader = require("../utils/multer")
const uploadImg = require("../utils/functions")
// const upload = multer({ dest: 'uploads/' })

const uploadRouter = Router()

const uploadRouterFn = () => {

    uploadRouter.post("/upload", uploader.any(), (req, res) => {
        // console.log(req.body)
        console.log(req.files)
        uploadImg(req.files[0].path)
        res.statusMessage = "puto"
        return res.send("test")
    })

    return uploadRouter

}

module.exports = uploadRouterFn