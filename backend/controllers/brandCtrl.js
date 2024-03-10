// brandCtrl.js

const asyncHandler = require("express-async-handler");
const {
  Brand,
  createBrandValidation,
  updateBrandValidation,
} = require("../models/Brand");

/**
 * @desc  Create a new brand
 * @route /api/brands/
 * @method POST
 * @access Public
 */
const createBrand = asyncHandler(async (req, res) => {
  const { error } = createBrandValidation(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const brand = new Brand({
    name: req.body.name,
    description: req.body.description,
    // Add more properties as needed
  });

  const savedBrand = await brand.save();
  res.status(201).json(savedBrand);
});

/**
 * @desc  Update a brand by ID
 * @route /api/brands/:id
 * @method PUT
 * @access Public
 */
const updateBrand = asyncHandler(async (req, res) => {
  const { error } = updateBrandValidation(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const updatedBrand = await Brand.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  );

  if (!updatedBrand) {
    return res.status(404).json({ message: "Brand not found" });
  }

  res.status(200).json(updatedBrand);
});

/**
 * @desc  Delete a brand by ID
 * @route /api/brands/:id
 * @method DELETE
 * @access Public
 */
const deleteBrand = asyncHandler(async (req, res) => {
  const brand = await Brand.findByIdAndDelete(req.params.id);
  if (!brand) {
    return res.status(404).json({ message: "Brand not found" });
  }

  res.status(200).json({ message: "Brand deleted successfully" });
});

/**
 * @desc  Get a brand by ID
 * @route /api/brands/:id
 * @method GET
 * @access Public
 */
const getBrandById = asyncHandler(async (req, res) => {
  const brand = await Brand.findById(req.params.id);
  if (!brand) {
    return res.status(404).json({ message: "Brand not found" });
  }

  res.status(200).json(brand);
});

/**
 * @desc  Get all brands
 * @route /api/brands/
 * @method GET
 * @access Public
 */
const getAllBrands = asyncHandler(async (req, res) => {
  const brands = await Brand.find();
  res.status(200).json(brands);
});


/**
 * @desc Upload image
 * @router /api/brands//upload-image
 * @method Post
 * @access private (only himself)
 */
let uploadImageCtrl = asyncHandler(async (req, res) => {
  //validate
  if (!req.file) {
    return res.status(400).json({ message: "No file provided" });
  }

  //get path of image
  let imagePath = path.join(__dirname, `../images/${req.file.filename}`);

  //upload to cloudinary
  let result = await cloudinaryUploadImage(imagePath);

  //get the user from DB
  let user = await User.findById(req.user.id);

  // delete the old profile photo if exist
  if (user.profilePhoto.publicId !== null) {
    await cloudinaryRemoveImage(user.profilePhoto.publicId);
  }
  // change the profilePhoto field of user from DB
  user.profilePhoto = {
    url: result.secure_url,
    publicId: result.public_id,
  };
  // save user changed in DB
  await user.save();
  // remove image file from image folder in the app
  fs.unlinkSync(imagePath);
  res.json({ message: "Upload image", image_url: result.url });
});
module.exports = {
  createBrand,
  updateBrand,
  deleteBrand,
  getBrandById,
  getAllBrands,
};
