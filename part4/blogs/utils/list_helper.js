const _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((totalLikes, blog) => {
    return totalLikes + blog.likes;
  }, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  return blogs.reduce((acc, current) => {
    return acc.likes > current.likes ? acc : current;
  });
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  const authorWithCounts = _.countBy(blogs, "author");
  const [author, count] = _.maxBy(
    Object.entries(authorWithCounts),
    (entry) => entry[1]
  );
  return { author, blogs: count };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
