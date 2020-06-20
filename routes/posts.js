const router = require("express").Router();
const passport = require("passport");
const Post = require("../models/Post");

router
  .route("/add")
  .post(passport.authenticate("jwt", { session: false }), (req, res) => {
    const text = req.body.text.trim();
    const media = req.body.media;
    const newPost = new Post({
      user: {
        id: req.user.id,
        name: req.user.name,
      },
      text,
      media,
    });

    newPost
      .save()
      .then((post) => res.json(post))
      .catch((err) => console.log(err));
  });

router.route("/").get((req, res) => {
  Post.find()
    .sort({ createdAt: -1 })
    .then((posts) => res.json(posts))
    .catch((err) => console.log(err));
});

router.route("/:userId").get((req, res) => {
  Post.find({ "user.id": req.params.userId })
    .sort({ createdAt: -1 })
    .then((posts) => res.json(posts))
    .catch((err) => console.log(err));
});

router.route("/search").post(async (req, res) => {
  try {
    console.log(req.body);
    const query = req.body.text;
    const searchResult = await Post.find(
      { $text: { $search: query } },
      { score: { $meta: "textScore" } }
    ).sort({ score: { $meta: "textScore" } });
    console.log(searchResult);
    res.json(searchResult);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
