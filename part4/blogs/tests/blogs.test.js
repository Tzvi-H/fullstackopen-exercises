const { test, after, beforeEach, describe } = require("node:test");
const assert = require("node:assert");
const supertest = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const Blog = require("../models/blog");
const helper = require("./test_helper");
const { title } = require("node:process");
const URL = "/api/blogs";

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
});

describe("GET /api/blogs", () => {
  test("blogs are returned as json", async () => {
    await api
      .get(URL)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("all blogs are returned", async () => {
    const response = await api.get(URL);
    assert.strictEqual(response.body.length, helper.initialBlogs.length);
  });

  test("a specific blog is returned", async () => {
    const response = await api.get(URL);
    const titles = response.body.map((note) => note.title);
    assert(titles.includes("title 1"));
  });

  test("a blog does not have the default '_id' property", async () => {
    const response = await api.get(URL);
    const blog1 = response.body[0];
    assert.strictEqual(blog1._id, undefined);
  });

  test("a blog has an 'id' property", async () => {
    const response = await api.get(URL);
    const blog1 = response.body[0];
    assert.ok(blog1.id);
  });
});

describe("POST /api/blogs", () => {
  test("a valid blog can be added", async () => {
    const newBlog = {
      title: "test title",
      author: "test author",
      url: "test url",
      likes: 3,
    };

    await api
      .post(URL)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1);

    const titles = blogsAtEnd.map((b) => b.title);
    assert(titles.includes("test title"));
  });

  test("the default 'likes' property equals 0", async () => {
    const newBlog = {
      title: "test title",
      author: "test author",
      url: "test url",
    };

    const { body } = await api.post(URL).send(newBlog);
    assert.strictEqual(body.likes, 0);
  });

  test("creating a blog without a title property will result in a 400 response code", async () => {
    const newBlog = {
      author: "test author",
      url: "test url",
    };

    await api.post(URL).send(newBlog).expect(400);
  });

  test("creating a blog without a url property will result in a 400 response code", async () => {
    const newBlog = {
      title: "test title",
      author: "test author",
    };

    await api.post(URL).send(newBlog).expect(400);
  });
});

after(async () => {
  await mongoose.connection.close();
});
