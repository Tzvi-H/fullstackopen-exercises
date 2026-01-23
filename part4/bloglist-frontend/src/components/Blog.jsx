import { useState } from "react";

const Blog = ({ blog, likeBlog, createdByCurrentUser, removeBlog }) => {
  const [visible, setVisible] = useState(false);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const showWhenVisible = { display: visible ? "" : "none" };
  // const hideWhenVisible = { display: visible ? "none" : "" };

  const toggleVisiblity = () => setVisible(!visible);
  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={toggleVisiblity}>{visible ? "hide" : "show"}</button>
      <div style={showWhenVisible}>
        <span data-testid="url">{blog.url}</span>
        <br />
        <span data-testid="likes">likes {blog.likes}</span>
        <button data-testid="like-button" onClick={() => likeBlog(blog)}>
          like
        </button>
        <br />
        {blog.user.name}
        <br />
        {createdByCurrentUser && (
          <button onClick={() => removeBlog(blog)}>remove</button>
        )}
      </div>
    </div>
  );
};

export default Blog;
