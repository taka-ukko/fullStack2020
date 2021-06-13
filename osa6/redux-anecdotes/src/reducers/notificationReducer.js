const initialState = {
    content: '',
    show: 'none'
}

const reducer = (state = initialState, action) => {
    // console.log('state now: ', state)
    // console.log('action', action)
    switch (action.type) {
        case 'SHOW':
            const show = {
                content: action.data,
                show: '' 
            }
            return show
        case 'HIDE':
            const hide = {
                content: '',
                show: 'none' 
            }
            return hide
        default:
            return state
    }
}

export const setNotification = (content, time) => {
    return async dispatch => {
        dispatch({
            type: 'SHOW',
            data: content
        })
        setTimeout(() => {
            dispatch({
                type: 'HIDE'
            })
        }, time * 1000)
    }
}
  
  export const hideNotification = () => {
    return {
      type: 'HIDE'
    }
}

export default reducer