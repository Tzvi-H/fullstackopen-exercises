import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

describe("<Blog />", () => {
  beforeEach(() => {
    const blog = {
      title: "dummy title",
      author: "dummy author",
      url: "dummy url",
      likes: 0,
      user: {
        name: "dummy name",
      },
    };

    render(<Blog blog={blog} />);
  });

  test("renders title", () => {
    const element = screen.getByText("dummy title", { exact: false });
    expect(element).toBeDefined();
  });

  test("renders author", () => {
    const element = screen.getByText("dummy author", { exact: false });
    expect(element).toBeDefined();
  });

  test("url and likes are not visible initially", () => {
    const urlElement = screen.getByTestId("url", { exact: false });
    expect(urlElement).not.toBeVisible();

    const likesElement = screen.getByTestId("likes", { exact: false });
    expect(likesElement).not.toBeVisible();
  });

  test("url and likes after clicking the show button", async () => {
    const user = userEvent.setup();
    const button = screen.getByText("show");
    await user.click(button);

    const urlElement = screen.getByTestId("url", { exact: false });
    expect(urlElement).toBeVisible();

    const likesElement = screen.getByTestId("likes", { exact: false });
    expect(likesElement).toBeVisible();
  });
});

test("clicking the like button twice invokes the handler twice", async () => {
  const mockHandler = vi.fn();
  const blog = {
    title: "dummy title",
    author: "dummy author",
    url: "dummy url",
    likes: 0,
    user: {
      name: "dummy name",
    },
  };

  render(<Blog blog={blog} likeBlog={mockHandler} />);
  const user = userEvent.setup();
  const button = screen.getByText("show");
  await user.click(button);
  const likeButton = screen.getByTestId("like-button");
  await user.click(likeButton);
  await user.click(likeButton);
  expect(mockHandler.mock.calls).toHaveLength(2);
});
