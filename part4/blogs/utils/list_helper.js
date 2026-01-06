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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
