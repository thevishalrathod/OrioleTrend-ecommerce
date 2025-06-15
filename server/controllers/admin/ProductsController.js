import { imageUploadUtil } from "../../helpers/cloudinary.js";
import Product from "../../models/Product.js";

/**
 * Upload Product Image
 */
export const handleImageUpload = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await imageUploadUtil(url);

    res.json({
      success: true,
      result,
    });
  } catch (error) {
    console.log("ERROR IN ProductsController.js:- ", error);
    res.json({
      success: false,
      message: "Some error occured",
    });
  }
};

/**
 * Add New Product
 */
export const addProduct = async (req, res) => {
  try {
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    } = req.body;

    console.log("sale price:- ", salePrice);

    const newlyCreatedProduct = new Product({
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    });

    await newlyCreatedProduct.save();
    res.status(201).json({ success: true, data: newlyCreatedProduct });
  } catch (error) {
    console.log("ERROR IN addProduct:- ", error);
    res.status(500).json({
      success: true,
      message: `Error: ${error.message}`,
    });
  }
};

/**
 * Fetch all products
 */
export const fetchAllProducts = async (req, res) => {
  try {
    const listOfProducts = await Product.find({});
    res.status(200).json({
      success: true,
      data: listOfProducts,
    });
  } catch (error) {
    console.log("ERROR IN fetchAllProduct:- ", error);
    res.status(500).json({
      success: true,
      message: `Error: ${error.message}`,
    });
  }
};

/**
 * Edit a product
 */
export const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("req.params : ", req.params);
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    } = req.body;

    let findProduct = await Product.findById(id);

    if (!findProduct)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });

    findProduct.title = title || findProduct.title;
    findProduct.description = description || findProduct.description;
    findProduct.category = category || findProduct.category;
    findProduct.brand = brand || findProduct.brand;
    findProduct.price = price === "" ? 0 : price || findProduct.price;
    findProduct.salePrice =
      salePrice === "" ? 0 : salePrice || findProduct.salePrice;
    findProduct.totalStock = totalStock || findProduct.totalStock;
    findProduct.image = image || findProduct.image;

    await findProduct.save();

    res.status(200).json({
      success: true,
      data: findProduct,
    });
  } catch (error) {
    console.log("ERROR IN editProduct:- ", error);
    res.status(500).json({
      success: true,
      message: `Error: ${error.message}`,
    });
  }
};

/**
 * Delete a product
 */
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product)
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });

    res.status(200).json({
      success: true,
      message: "Product deleted successfuly",
    });
  } catch (error) {
    console.log("ERROR IN deleteProduct:- ", error);
    res.status(500).json({
      success: true,
      message: `Error: ${error.message}`,
    });
  }
};
