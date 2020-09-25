const express = require("express");
const Product = require("../mongo_models/Product");
const router = express.Router();

//get all the productss
router.get("/all", async (req, res) => {
  try {
    const Products = await Product.find();
    res.status(200).json(Products);
  } catch (err) {
    res.json({ message: err });
  }
});
//create new product
router.post("/new", async (req, res) => {
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    stock: req.body.stock,
  });
  try {
    const savedProduct = await product.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.json({ message: err });
  }
});
//get specific product

router.get("/:productId", async (req, res) => {
  try {
    const product = await Product.find({ _id: req.params.productId });
    res.status(200).json(product);
  } catch (err) {
    res.json({
      message: err,
    });
  }
});
//deleting a post
router.delete("/delete/:productId", async (req, res) => {
  try {
    const removedProduct = await Product.remove({_id: req.params.productId });
    res.status(200).json(removedProduct);
  } catch (err) {
    res.json({ message: err });
  }
});

router.patch("/update/:productId", async (req, res) => {
  try {
    const updatedOne = await Product.updateOne(
      { _id:req.params.productId },
      {
        $set: {
          name: req.body.name,
          price: req.body.price,
          stock: req.body.stock,
        },
      }
    );
    res.status(200).json(updatedOne);
  } catch (err) {
    res.json({ message: err });
  }
});
module.exports = router;
