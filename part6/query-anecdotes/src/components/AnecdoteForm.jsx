import { useMutation, useQueryClient } from '@tanstack/react-query'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation({
    mutationFn: async (newAnecdote) => {
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAnecdote),
      }
      const response = await fetch('http://localhost:3001/anecdotes', options)

      if (!response.ok) {
        throw new Error('Failed to create note')
      }

      return await response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    if (content.length < 5) {
      alert('Anecdote must be at least 5 characters')
      return
    }
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
