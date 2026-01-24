import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState(null);
  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      setUser(user);
      setUsername("");
      setPassword("");
      setNotification("Sucessfully logged in");
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    } catch {
      setNotification("wrong credentials");
      setTimeout(() => {
        setNotification(null);
      }, 6000);
    }
  };

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem("loggedBlogappUser");
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        <label>
          username
          <input
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          password
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </label>
      </div>
      <button type="submit">login</button>
    </form>
  );

  const addBlog = async (blogObject) => {
    const savedBlog = await blogService.create(blogObject, user.token);
    setBlogs(blogs.concat(savedBlog));
    blogFormRef.current.toggleVisibility();
    setNotification(
      `a new blog ${savedBlog.title} by ${savedBlog.author} added`,
    );
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const likeBlog = async (blog) => {
    const result = await blogService.update(blog);
    const updatedBlog = { ...blog, likes: result.likes };
    setBlogs(
      blogs.map((blog) => (blog.id !== updatedBlog.id ? blog : updatedBlog)),
    );
  };

  const removeBlog = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await blogService.remove(blog, user.token);
      setBlogs(blogs.filter((b) => b.id !== blog.id));
    }
  };

  const blogForm = () => (
    <Togglable ref={blogFormRef} buttonLabel="create new blog">
      <BlogForm createBlog={addBlog} />
    </Togglable>
  );

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);

  if (user === null) {
    return (
      <div>
        {notification && <p className="notification">{notification}</p>}
        <h2>Log in to application</h2>
        {loginForm()}
      </div>
    );
  }

  return (
    <div>
      {notification && <p className="notification">{notification}</p>}
      <h2>blogs</h2>
      <p>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </p>
      {blogForm()}
      {sortedBlogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          likeBlog={likeBlog}
          removeBlog={removeBlog}
          createdByCurrentUser={blog.user.username === user.username}
        />
      ))}
    </div>
  );
};

export default App;
