const { test, describe, beforeEach, after } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const User = require("../models/user");
const helper = require("./test_helper");

const api = supertest(app);
const USERS_URL = "/api/users";

beforeEach(async () => {
  await User.deleteMany({});
});

describe("POST /api/users", () => {
  test("fails with a 400 if username is less than 3 characters", async () => {
    const usersAtStart = await helper.usersInDb();
    await api
      .post(USERS_URL)
      .send({
        username: "abc",
        password: "12",
        name: "name",
      })
      .expect(400);

    const usersAtEnd = await helper.usersInDb();
    assert.strictEqual(usersAtStart.length, usersAtEnd.length);
  });

  test("fails with a 400 if password is less than 3 characters", async () => {
    const usersAtStart = await helper.usersInDb();
    await api
      .post(USERS_URL)
      .send({
        username: "ab",
        password: "1234",
        name: "name",
      })
      .expect(400);
    const usersAtEnd = await helper.usersInDb();
    assert.strictEqual(usersAtStart.length, usersAtEnd.length);
  });
});

after(async () => {
  mongoose.connection.close();
});
