import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders title', () => {
  const blog = {
    title: "dummy title",
    author: "dummy author",
    url: "dummy url",
    likes: 0,
    user: {
        name: "dummy name"
    }
  }

  render(<Blog blog={blog} />)

  const element = screen.getByText("dummy title", {exact: false})
  expect(element).toBeDefined()
})

test('renders author', () => {
  const blog = {
    title: "dummy title",
    author: "dummy author",
    url: "dummy url",
    likes: 0,
    user: {
        name: "dummy name"
    }
  }

  render(<Blog blog={blog} />)

  const element = screen.getByText("dummy author", {exact: false})
  expect(element).toBeDefined()
})

test('url and likes are not visible', () => {
  const blog = {
    title: "dummy title",
    author: "dummy author",
    url: "dummy url",
    likes: 0,
    user: {
        name: "dummy name"
    }
  }

  render(<Blog blog={blog} />)

  const urlElement = screen.getByTestId("url", {exact: false})
  expect(urlElement).not.toBeVisible()

  const likesElement = screen.getByTestId("likes", {exact: false})
  expect(likesElement).not.toBeVisible()
})