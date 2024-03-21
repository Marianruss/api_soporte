const Router = require("express")
const bodyParser = require("body-parser")
const uploader = require("../utils/multer")
const uploadImg = require("../utils/functions")
// const upload = multer({ dest: 'uploads/' })


const { initializeApp } = require('firebase/app');
const { getStorage, ref, uploadBytes } = require('firebase/storage');

const firebaseConfig = {
    apiKey: "AIzaSyCZ_GdNrTQ4UnbFE5hG72BjOMmd3qp69uI",
    authDomain: "support-api-da35e.firebaseapp.com",
    projectId: "support-api-da35e",
    storageBucket: "support-api-da35e.appspot.com",
    messagingSenderId: "49503891323",
    appId: "1:49503891323:web:876c6c49fca16d8bef57de"
};
const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);


const uploadRouter = Router()

const uploadRouterFn = () => {

    uploadRouter.post("/upload", (req, res) => {
        
        // Begin file upload
        try {
            const imgRef = ref(storage, `images/${img.name}`)
            uploadBytes(imgRef, img).then((res) => {
                console.log("image uploaded")
                
            })
        } catch (error) {
            console.log(error)
        }
    })




    return uploadRouter

}

module.exports = uploadRouterFn