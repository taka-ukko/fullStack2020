import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { showNotification, hideNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = (props) => {
    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        const newAnecdote = await anecdoteService.createNew(content)
        console.log(newAnecdote)
        dispatch(createAnecdote(newAnecdote))

        dispatch(showNotification(`you created '${newAnecdote.content}'`))
        
        let timeoutHandle = setTimeout(() => {
            dispatch(hideNotification())
        }, 5000)
        timeoutHandle--
        while (timeoutHandle--) {
            clearTimeout(timeoutHandle)
        }
    }

    return (
        <>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div><input name='anecdote'/></div>
                <button type='submit'>create</button>
            </form>
        </>
    )
}

export default AnecdoteForm