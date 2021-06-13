import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {
  // console.log('state now: ', state)
  // console.log('action', action)
  switch (action.type) {
    case 'VOTE':
      // const id = action.data.id
      // const anecdoteToVote = state.find(n => n.id === id)
      // const changedAnecdote = {
      //   ...anecdoteToVote,
      //   votes: anecdoteToVote.votes + 1
      // }
      const changedAnecdote = action.data
      return state.map(anecdote => 
        anecdote.id !== changedAnecdote.id ? anecdote : changedAnecdote  
      ).sort((x,y) => y.votes - x.votes)
    case 'NEW_ANECDOTE':
      return state.concat(action.data)
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}

export const voteAnecdote = (object) => {
  return async dispatch => {
    const returnedObject = await anecdoteService.likeAnecdote(object)
    dispatch({
      type: 'VOTE',
      data: returnedObject
    })
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const returnedObject = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: returnedObject,
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export default reducer