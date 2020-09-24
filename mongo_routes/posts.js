const express = require("express");
const Post = require("../mongo_models/Post");
const router = express.Router();
//get all the posts
router.get("/", async (req, res) => {
  try {
    const Posts = await Post.find();

    res.status(200).json(Posts);
  } catch (err) {
    res.json({ message: err });
  }
});
//submit the posts
router.post("/", async (req, res) => {
  const post = new Post({
    title: req.body.title,
    description: req.body.description,
  });
  try {
    const savedPost = await post.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.json({ message: err });
  }
});
//get specific post

router.get("/:postId", async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    res.status(200).json(post);
  } catch (err) {
    res.json({
      message: err,
    });
  }
});
//deleting a post
router.delete("/:postId", async (req, res) => {
  try {
    const removedPost = await Post.remove({ _id: req.params.postId });
    res.status(200).json(removedPost);
  } catch (err) {
    res.json({ message: err });
  }
});

router.patch("/:postId", async (req, res) => {
  try {
    const updatedOne = await Post.updateOne(
      { _id: req.params.postId },
      { $set: { title: req.body.title } }
    );
    res.status(200).json(updatedOne);
  } catch (err) {
      res.json({message:err})
  }
});
module.exports = router;
