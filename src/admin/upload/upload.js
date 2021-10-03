const express = require('express')
const multer = require('multer');
const router = express();
const { Product } = require('../../db/schema');
const fs = require('fs')
const path = require("path")



const storagePath = path.join(__dirname, "../../../src/public/uploads")

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, storagePath)
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

var upload = multer({ storage: storage });



router.post('/upload/mainimage', upload.single('image'), async (req, res, next) => {
    var obj = {
        name: req.body.name,
        desc: req.body.desc,
        img: {
            data: fs.readFileSync(path.join(storagePath + "/" + req.file.filename)),
            contentType: 'image/png'
        }
    };

    const savedData = await Product({ images: { "mainImage": obj } });
    savedData.save();
    console.log(savedData);
    res.send("image saved sussfully")

});

router.get('/uploaded/images', (req, res) => {
    Product.find({}, (err, items) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        }
        else {
            // console.log(items[0].images.mainImage.img);

        }
    });
});


module.exports = router

