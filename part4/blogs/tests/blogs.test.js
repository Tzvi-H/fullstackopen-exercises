const { test, after, beforeEach, describe } = require("node:test");
const assert = require("node:assert");
const supertest = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const Blog = require("../models/blog");
const helper = require("./test_helper");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
});

describe("calling /api/blogs", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("all blogs are returned", async () => {
    const response = await api.get("/api/blogs");
    assert.strictEqual(response.body.length, helper.initialBlogs.length);
  });

  test("a specific blog is returned", async () => {
    const response = await api.get("/api/blogs");
    const titles = response.body.map((note) => note.title);
    assert(titles.includes("title 1"));
  });

  test("a blog does not have the default '_id' property", async () => {
    const response = await api.get("/api/blogs");
    const blog1 = response.body[0];
    assert.strictEqual(blog1._id, undefined);
  });

  test("a blog has an 'id' property", async () => {
    const response = await api.get("/api/blogs");
    const blog1 = response.body[0];
    assert.ok(blog1.id);
  });
});

after(async () => {
  await mongoose.connection.close();
});
