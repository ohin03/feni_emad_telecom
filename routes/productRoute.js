import express from 'express';
import { isAdmin, requireSignin } from '../middlewares/authMiddleware.js';
import { createProductController, deleteProductController, getproductController, getSingleproductController, productCategoryController, productCountController, productFilterController, productListController, productPhotoController, relatedProductController, searchProductController, updateProductController } from '../controllers/productController.js';
import formidable from 'express-formidable';
const router = express.Router();


//routes
router.post('/create-product', requireSignin, isAdmin,formidable(), createProductController)

//get products
router.get('/get-product', getproductController)

//get single products
router.get('/get-product/:slug', getSingleproductController)

//get photo
router.get('/product-photo/:pid', productPhotoController)

//delete product
router.delete('/delete-product/:pid', deleteProductController)

//update product

router.put('/update-product/:pid', requireSignin, isAdmin,formidable(), updateProductController)

//filter product
router.post('/product-filters', productFilterController)

// home load more
router.get("/product-list/:page", productListController);

//load more count
router.get("/product-count", productCountController);

//search product
router.get('/search/:keyword', searchProductController)


// related products
router.get("/related-product/:productId/:categoryId", relatedProductController);

// category wise product
router.get('/product-category/:slug', productCategoryController)

export default router;