import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import NotificationContext from './NotificationContext'
import { useContext } from 'react'

const App = () => {
  const { notificationDispatch } = useContext(NotificationContext)
  const queryClient = useQueryClient()
  const updateAnecdoteMutation = useMutation({
    mutationFn: async (updatedAnecdote) => {
      const options = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedAnecdote),
      }
      const response = await fetch(
        `http://localhost:3001/anecdotes/${updatedAnecdote.id}`,
        options,
      )

      if (!response.ok) {
        throw new Error('Failed to create note')
      }

      return await response.json()
    },
    onSuccess: ({ content }) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      notificationDispatch({
        type: 'SET_NOTIFICATION',
        payload: `anecdote '${content}' voted`,
      })
      setTimeout(
        () => notificationDispatch({ type: 'REMOVE_NOTIFICATION' }),
        2500,
      )
    },
  })

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3001/anecdotes')
      if (!response.ok) {
        throw new Error('Failed to fetch notes')
      }
      return await response.json()
    },
    retry: 1,
    refetchOnWindowFocus: false,
  })

  if (result.isLoading) {
    return <div>loading data...</div>
  } else if (result.isError) {
    return (
      <div>anecdote service not available due to problems in the server</div>
    )
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
