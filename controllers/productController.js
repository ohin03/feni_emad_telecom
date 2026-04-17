import slugify from "slugify"
import productModel from "../models/productModel.js"
import fs from 'fs'
import categoryModel from '../models/categoryModel.js'
export const createProductController = async (req,res) => {
   try {
    const {name,slug,description,price,category,quantity,shipping } = req.fields
    const {photo} = req.files
    //validation 
    switch(true){
        case !name:
            return res.status(500).send({
                error: "Name is required"
            })
        
        case !description:
            return res.status(500).send({
                error: "Description is required"
            })  
        case !price:
            return res.status(500).send({
                error: "Price is required"
            }) 
        case !category:
            return res.status(500).send({
                error: "Category is required"
            })  
        case !quantity:
            return res.status(500).send({
                error: "Quantity is required"
            })
        case photo && photo.size > 10000000:
            return res.status(500).send({
                error: "Photo is required and should be less than 1mb"
            })
    }

    const product = new productModel({...req.fields, slug:slugify(name)})
    if(photo){
        product.photo.data = fs.readFileSync(photo.path)
        product.photo.contentType = photo.type
    }
    await product.save()
    res.status(201).send({
            success: true,
            message: "Product created successfully..",
            product
        })
   }catch(error) {
    console.log(error)
        res.status(500).send({
            success:false,
            error,
            message: "Error in creating product!!"
        })
   }
}

// get products
export const getproductController = async (req,res) => {
    try {
        const products = await productModel.find({}).populate("category").select("-photo").sort({createdAt:-1})
         res.status(200).send({
            success: true,
            countTotal: products.length,
            message: "All products",
            products,       
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message: "Error in geating products",
             error: error.message
        })
    }
}

// get single product
export const getSingleproductController = async (req,res) => {
    try {
        const product = await productModel.findOne({slug:req.params.slug}).select("-photo").populate("category")
        res.status(200).send({
            success: true,
            message: "Single product fetched",
            product,       
        })
    } catch (error) {
         console.log(error)
        res.status(500).send({
            success:false,
            message: "Error in getting single product",
             error: error.message
        })
    }

}
// product photo
export const productPhotoController = async (req,res) => {
    try {
        const product = await productModel.findById(req.params.pid).select("photo")
        if(product.photo.data){
            res.set('Content-type', product.photo.contentType)
            res.status(200).send(product.photo.data)
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message: "Error while getting product photo",
             error
        })
    }
}
// delete product
export const deleteProductController = async (req,res) => {
    try {
        await productModel.findByIdAndDelete(req.params.pid).select("-photo")
         res.status(200).send({
            success: true,
            message: "Product Deleted Successfully..",
           
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message: "Error while deleting product",
             error
        })
    }
}
//update product
export const  updateProductController = async (req,res) => {
    try {
        console.log('\n[updateProductController] req.fields:', req.fields);
        console.log('[updateProductController] req.files:', req.files);

        Object.keys(req.fields || {}).forEach((k) => {
            if (req.fields[k] === "undefined" || req.fields[k] === "") {
                delete req.fields[k];
            }
        });


        if (req.fields && typeof req.fields.shipping === 'string') {
            if (req.fields.shipping === '0') req.fields.shipping = false;
            else if (req.fields.shipping === '1') req.fields.shipping = true;
        }

        const {name,slug,description,price,category,quantity,shipping } = req.fields || {}
    const {photo} = req.files || {}
    //validation 
    switch(true){
        case !name:
            return res.status(500).send({
                error: "Name is required"
            })
        
        case !description:
            return res.status(500).send({
                error: "Description is required"
            })  
        case !price:
            return res.status(500).send({
                error: "Price is required"
            }) 
     
        case !quantity:
            return res.status(500).send({
                error: "Quantity is required"
            })
        case photo && photo.size > 10000000:
            return res.status(500).send({
                error: "Photo is required and should be less than 1mb"
            })
    }

    // log sanitized fields for debugging
    console.log('[updateProductController] sanitized fields for update:', req.fields);

    const product = await productModel.findByIdAndUpdate(
        req.params.pid,
        {...req.fields, slug:slugify(name)},
        {new:true}
    )
    if(photo){
        product.photo.data = fs.readFileSync(photo.path)
        product.photo.contentType = photo.type
    }
    await product.save()
    res.status(201).send({
            success: true,
            message: "Product created successfully",
            product
        })
    } catch (error) {
        console.log(error)
        console.error('[updateProductController] error:', error);
        res.status(500).send({
            success:false,
            message: "Error in updating product",
            error: error.message || error
        })
    }
}

//filter
export const productFilterController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};

    // Category filter (multiple selection)
    if (checked && checked.length > 0) {
      args.category = { $in: checked };
    }

    // Price filter
    if (radio && radio.length === 2) {
      args.price = { $gte: radio[0], $lte: radio[1] };
    }

    // Fetch filtered products
    const products = await productModel.find(args);

    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log("Error while filtering products:", error);
    res.status(400).send({
      success: false,
      message: "Error while filtering products",
      error,
    });
  }
};

// load more controller
export const productListController = async (req, res) => {
  try {
    const perPage = 8;
    const page = req.params.page ? req.params.page : 1;

    const products = await productModel
      .find({})
      .sort({ createdAt: -1 })
      .skip((page - 1) * perPage)
      .limit(perPage);

    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
    });
  }
};

// load more hide
export const productCountController = async (req, res) => {
  try {
    const total = await productModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
    });
  }
};

//search product controller
export const searchProductController = async (req, res) => {
    try {
        const {keyword} = req.params
        const results = await productModel.find({
            $or: [
                {name:{$regex:keyword,$options:"i"}},
                {description:{$regex:keyword, $options:"i"}},
            ]
        }).select("-photo");
        res.json(results);
    } catch (error) {
        console.log(error)
        res.status(400).send({
      success: false,
      message: "Error in search product API",
      error,
    });
    }
}


// related product
// related products
export const relatedProductController = async (req, res) => {
  try {
        const { productId, categoryId } = req.params;
        const products = await productModel.find({
            category: categoryId,
            _id: { $ne: productId } // exclude current product
        })
            .select("-photo")
            .limit(6);

        res.status(200).json({
            success: true,
            products,
        });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error loading related products",
      error,
    });
  }
};
 
// category wise product get
export const productCategoryController = async (req, res) => {
    try {
        const category = await categoryModel.findOne({slug:req.params.slug})
        const products = await productModel.find({category}).populate('category')
        res.status(200).send({
            success: true,
            category,
            products
        })
    } catch (error) {
          res.status(400).send({
      success: false,
      message: "Error in category wise product",
      error,
    });
    }
}