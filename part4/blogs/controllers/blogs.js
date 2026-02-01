const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const middleWare = require("../utils/middleware");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  response.json(blog);
});

blogsRouter.post("/", middleWare.userExtractor, async (request, response) => {
  const user = request.user;
  const blog = new Blog(request.body);
  blog.user = user._id;
  await blog.save();
  user.blogs = user.blogs.concat(blog._id);
  await user.save();
  await blog.populate("user", { username: 1, name: 1 });
  response.status(201).json(blog);
});

blogsRouter.delete(
  "/:id",
  middleWare.userExtractor,
  async (request, response) => {
    const user = request.user;
    const blog = await Blog.findById(request.params.id);
    if (blog.user.toString() !== user._id.toString()) {
      return response
        .status(401)
        .json({ error: "only creator can delete blog" });
    }

    await blog.deleteOne();
    response.status(204).end();
  },
);

blogsRouter.put("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id);

  if (!blog) return response.status(404).end();

  blog.likes = request.body.likes;
  const savedBlog = await blog.save();

  response.json(savedBlog);
});

module.exports = blogsRouter;
