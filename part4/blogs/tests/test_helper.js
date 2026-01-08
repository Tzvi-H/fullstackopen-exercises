const Blog = require("../models/blog");

const initialBlogs = [
  {
    title: "title 1",
    author: "author 1",
    url: "url 1",
    likes: 1,
  },
  {
    title: "title 2",
    author: "author 2",
    url: "url 2",
    likes: 2,
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = { initialBlogs, blogsInDb };
