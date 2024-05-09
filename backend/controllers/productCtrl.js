const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");

const {
  Product,
  createProductValidation,
  updateProductValidation,
} = require("../models/Product");
const { Category } = require("../models/Category");
const {
  cloudinaryUploadImage,
  cloudinaryRemoveImage,
} = require("../utils/cloudinary");
const { Size } = require("../models/Size");
const { Color } = require("../models/Color");
const { Brand } = require("../models/Brand");

/**
 * @desc Create a new product
 * @route POST /api/products
 * @access Public
 */
const createProduct = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No image provided" });
  }

  const { error } = createProductValidation(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  let isCategory = await Category.findById(req.body.category);
  if (!isCategory)
    return res.status(400).json({ massage: "category is no found" });

  // Handle image upload
  const imagePath = path.join(__dirname, `../images/${req.file.filename}`);
  const result = await cloudinaryUploadImage(imagePath);

  // Create a new product instance with the required fields, including color
  const product = new Product({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    sizes: req.body.sizes,
    category: req.body.category,
    brand: req.body.brand,
    color: req.body.color,
    discount: req.body.discount,
    image: {
      url: result.secure_url,
      publicId: result.public_id,
    },
  });

  // Save the product to the database
  const savedProduct = await product.save();

  // Remove image file from the image folder in the app
  fs.unlinkSync(imagePath);
  res.status(201).json({ message: " the product has been created! " });
});

/**
 * @desc Delete a product by ID
 * @route DELETE /api/products/:id
 * @access Public
 */
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (product.image.publicId !== null) {
    await cloudinaryRemoveImage(product.image.publicId);
  }
  // if (!product) return res.status(400).json({ message: "Product not found" });

  res.status(200).json({ message: "Product deleted successfully" });
});

/**
 * @desc Update a product by ID
 * @route PUT /api/products/:id
 * @access Public
 */
const updateProduct = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { error } = updateProductValidation(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  );

  if (!updatedProduct)
    // return res.status(400).json({ message: "Product not found" });

    res.status(200).json(updatedProduct);
});

/**
 * @desc Get a product by Title
 * @route GET /api/products/title/:Title
 * @access Public
 */
const getProductByTitle = asyncHandler(async (req, res) => {
  const product = await Product.findOne({
    title: req.params.id.replace(/-/g, " "),
  })
    .populate("category")
    .populate("brand")
    .populate("color");

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  // Find related products based on category or brand
  const relatedProducts = await Product.find({
    $or: [
      { category: product.category },
      { brand: product.brand },
      // Add more criteria if needed
    ],
    _id: { $ne: product._id }, // Exclude the current product
  }).limit(4); // Limit the number of related products

  res.status(200).json({ ...product._doc, relatedProducts });
});
/**
 * @desc Get a product by id
 * @route GET /api/products/id/:id
 * @access Public
 */
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
    .populate("category")
    .populate("brand")
    .populate("color");

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  // Find related products based on category or brand
  const relatedProducts = await Product.find({
    $or: [
      { category: product.category },
      { brand: product.brand },
      // Add more criteria if needed
    ],
    _id: { $ne: product._id }, // Exclude the current product
  }).limit(4); // Limit the number of related products

  res.status(200).json({ ...product._doc, relatedProducts });
});

/**
 * @desc Get all products with pagination and filtering
 * @route GET /api/products
 * @access Public
 */
const getAllProducts = asyncHandler(async (req, res) => {
  const {
    page = 1,
    category,
    colors,
    minPrice,
    maxPrice,
    sizes,
    sortBy,
    brand,
    search, // Add search parameter
  } = req.query;
  const limit = 20; // Number of products per page
  const skip = (page - 1) * limit;
  let filter = {};

  // Apply category filter if provided
  if (category) {
    const categoryNames = Array.isArray(category) ? category : [category];
    const categoryIds = [];
    for (const categoryName of categoryNames) {
      const categoryObject = await Category.findOne({ name: categoryName });
      if (categoryObject) {
        categoryIds.push(categoryObject._id);
      }
    }
    if (categoryIds.length > 0) {
      filter.category = { $in: categoryIds };
    }
  }

  // Apply brand filter if provided
  if (brand) {
    const brandNames = Array.isArray(brand) ? brand : [brand];
    const brandIds = [];
    for (const brandName of brandNames) {
      const brandObject = await Brand.findOne({ name: brandName });
      if (brandObject) {
        brandIds.push(brandObject._id);
      }
    }
    if (brandIds.length > 0) {
      filter.brand = { $in: brandIds };
    }
  }

  // Apply colors filter if provided
  if (colors) {
    const colorNames = colors.split(",");
    const colorObjects = await Color.find({ name: { $in: colorNames } });
    const colorIds = colorObjects.map((color) => color._id);
    filter.color = { $in: colorIds };
  }

  // Apply price range filter if minPrice and/or maxPrice are provided
  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) {
      filter.price.$gte = parseFloat(minPrice);
    }
    if (maxPrice) {
      filter.price.$lte = parseFloat(maxPrice);
    }
  }

  // Apply sizes filter if provided
  if (sizes) {
    const sizeNames = sizes.split(",").map((size) => size.toUpperCase());
    const sizeObjects = await Size.find({ name: { $in: sizeNames } });
    const sizeIds = sizeObjects.map((size) => size._id);
    filter.sizes = { $in: sizeIds };
  }

  // Apply search query filter if provided
  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: "i" } }, // Search in title
      { description: { $regex: search, $options: "i" } }, // Search in description
    ];
  }

  // Query products with applied filters
  let query = Product.find(filter)
    .populate("category")
    .populate("brand")
    .populate("color");

  // Sort products if sortBy parameter is provided
  if (sortBy) {
    const sortOptions = {
      featured: "-createdAt",
      "best-selling": "-sales",
      "alphabetically-a-z": "title",
      "alphabetically-z-a": "-title",
      "price-low-to-high": "price",
      "price-high-to-low": "-price",
      "date-old-to-new": "createdAt",
      "date-new-to-old": "-createdAt",
    };
    const sortField = sortOptions[sortBy];
    if (sortField) {
      query = query.sort(sortField);
    }
  }

  const data = await query.limit(limit).skip(skip);

  // Find total count of products with applied filters
  const totalCount = await Product.countDocuments(filter);

  // Calculate total number of pages
  const totalPages = Math.ceil(totalCount / limit);
  // Return products, total pages, and total count in the response
  res.status(200).json({
    data,
    totalPages,
    totalCount,
  });
});

/**
 * @desc Get products on sale
 * @route GET /api/products/sale
 * @access Public
 */

const getProductsOnSale = asyncHandler(async (req, res) => {
  const {
    page = 1,
    category,
    colors,
    minPrice,
    maxPrice,
    sizes,
    sortBy,
    brand,
  } = req.query;

  const limit = 20; // Number of products per page
  const skip = (page - 1) * limit;
  let filter = {
    discount: { $gt: 0 }, // Filter products with discount greater than 0
  };

  // Apply category filter if provided
  if (category) {
    const categoryNames = Array.isArray(category) ? category : [category];
    const categoryIds = [];
    for (const categoryName of categoryNames) {
      const categoryObject = await Category.findOne({ name: categoryName });
      if (categoryObject) {
        categoryIds.push(categoryObject._id);
      }
    }
    if (categoryIds.length > 0) {
      filter.category = { $in: categoryIds };
    }
  }

  // Apply brand filter if provided
  if (brand) {
    const brandNames = Array.isArray(brand) ? brand : [brand];
    const brandIds = [];
    for (const brandName of brandNames) {
      const brandObject = await Brand.findOne({ name: brandName });
      if (brandObject) {
        brandIds.push(brandObject._id);
      }
    }
    if (brandIds.length > 0) {
      filter.brand = { $in: brandIds };
    }
  }

  // Apply color filter if provided
  if (colors) {
    const colorNames = colors.split(",");
    const colorObjects = await Color.find({ name: { $in: colorNames } });
    const colorIds = colorObjects.map((color) => color._id);
    filter.color = { $in: colorIds };
  }

  // Apply price range filter if minPrice and/or maxPrice are provided
  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) {
      filter.price.$gte = parseFloat(minPrice);
    }
    if (maxPrice) {
      filter.price.$lte = parseFloat(maxPrice);
    }
  }

  // Apply sizes filter if provided
  if (sizes) {
    const sizeNames = sizes.split(",").map((size) => size.toUpperCase());
    const sizeObjects = await Size.find({ name: { $in: sizeNames } });
    const sizeIds = sizeObjects.map((size) => size._id);
    filter.sizes = { $in: sizeIds };
  }

  // Query products with applied filters
  let query = Product.find(filter).populate("category");

  // Sort products if sortBy parameter is provided
  if (sortBy) {
    const sortOptions = {
      featured: "-createdAt",
      "best-selling": "-sales",
      "alphabetically-a-z": "title",
      "alphabetically-z-a": "-title",
      "price-low-to-high": "price",
      "price-high-to-low": "-price",
      "date-old-to-new": "createdAt",
      "date-new-to-old": "-createdAt",
    };
    const sortField = sortOptions[sortBy];
    if (sortField) {
      query = query.sort(sortField);
    }
  }

  const data = await query.limit(limit).skip(skip);

  // Find total count of products with applied filters
  const totalCount = await Product.countDocuments(filter);

  // Calculate total number of pages
  const totalPages = Math.ceil(totalCount / limit);

  // Return products, total pages, and total count in the response
  res.status(200).json({
    data,
    totalPages,
    totalCount,
  });
});

/**
 * @desc Update the image Product By Id
 * @router /api/Products/update-image/:id
 * @method Put
 * @access private (admin)
 */
const updateImageProductById = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(404).json({ massage: "image file not found" });
  }
  let product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).json({ massage: "product not found" });
  }

  if (product.image.publicId !== null) {
    await cloudinaryRemoveImage(product.image.publicId);
  }
  let imagePath = path.join(__dirname, `../images/${req.file.filename}`);
  let result = await cloudinaryUploadImage(imagePath);

  product.image = {
    url: result.secure_url,
    publicId: result.public_id,
  };

  // Add color update
  if (req.body.color) {
    product.color = req.body.color;
  }

  product.save();
  fs.unlinkSync(imagePath);
  return res.status(200).json(product);
});

module.exports = {
  createProduct,
  deleteProduct,
  updateProduct,
  getAllProducts,
  getProductsOnSale,
  updateImageProductById,
  getProductByTitle,
  getProductById,
};
