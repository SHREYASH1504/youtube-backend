import multer from "multer";

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "./public/temp"); // specify the directory to save uploaded files
    },
    filename: function(req, file, cb) {              
        cb(null, file.originalname); // create a unique filename
    }
});

export const upload = multer({ 
    storage
 });
