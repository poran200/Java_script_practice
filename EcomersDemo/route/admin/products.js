const express = require('express');
const {check, validationResult} = require('express-validator');
const multer = require('multer');
const productRepository = require('../../repository/productReopsitory');
const newProductTemplate = require('../../views/admin/product/new');
const {reqTitle,reqPrice} = require('./validator')
const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get('/admin/products',( async (req, res) => {
        const products = await productRepository.getAll();
        return res.json(products);
}));

router.get('/admin/products/new',((req, res) => {
   res.send(newProductTemplate({}));
}));
router.post('/admin/products/new',
    upload.single('image'),
    [reqTitle,reqPrice],(async (req, res) => {
     const error = validationResult(req);
     if (!(error.isEmpty())){
         console.log(error);
         res.send(newProductTemplate({error}));
     }else {
         const {title, price,} = req.body;
         try {
             const image = req.file.buffer.toString('base64');
             await productRepository.create({title,price,image});
             return  res.send('success');
         }catch (e) {
             return res.status(500).send('Internal Server Error');
         }
     }


}));
module.exports = router
