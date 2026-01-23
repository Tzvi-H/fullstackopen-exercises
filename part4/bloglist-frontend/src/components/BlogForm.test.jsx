import { render, screen } from "@testing-library/react";
import BlogForm from "./BlogForm";
import userEvent from "@testing-library/user-event";

test.only("<BlogForm /> calls createBlog with correct arguments", async () => {
  const user = userEvent.setup();
  const createBlog = vi.fn();

  render(<BlogForm createBlog={createBlog} />);

  const inputTitle = screen.getByLabelText("title:");
  const inputAuthor = screen.getByLabelText("author:");
  const inputUrl = screen.getByLabelText("url:");

  const sendButton = screen.getByText("create");

  await user.type(inputTitle, "dummy title");
  await user.type(inputAuthor, "dummy author");
  await user.type(inputUrl, "dummy url");
  await user.click(sendButton);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe("dummy title");
  expect(createBlog.mock.calls[0][0].author).toBe("dummy author");
  expect(createBlog.mock.calls[0][0].url).toBe("dummy url");
});
