import express from 'express';
import { isAdmin, requireSignin } from './../middlewares/authMiddleware.js';
import { categoryController, createCategoryController, deleteCategoryController, singleCategoryController, updateCategoryController } from '../controllers/createCategoryController.js';

const router = express.Router();

//routes

//create category
router.post('/create-category', requireSignin, isAdmin, createCategoryController);

//update category
router.put('/update-category/:id', requireSignin, isAdmin, updateCategoryController);

//get all category
router.get('/get-category', categoryController)

//single category
router.get('/single-category/:slug',singleCategoryController)

//delete category
router.delete('/delete-category/:id', requireSignin, isAdmin, deleteCategoryController)

export default router;