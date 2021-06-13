import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
    const anecdotes = useSelector(state => {
      const filteredAnecdotes = state.anecdotes.filter(anecdote => {
        const lowerAnecdote = anecdote.content.toLowerCase()
        return lowerAnecdote.includes(state.filter.content.trim())
      })
      return filteredAnecdotes
    })
    const dispatch = useDispatch()

    const vote = (anecdote) => {
      dispatch(voteAnecdote(anecdote))
      dispatch(setNotification(`you voted '${anecdote.content}'`, 3))
    }

    return (
        <>
        {anecdotes.map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote)}>vote</button>
              </div>
            </div>
        )}
        </>
    )
}

export default AnecdoteList
