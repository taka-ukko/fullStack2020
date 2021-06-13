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
                content: action.data.content,
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

export const showNotification = (content) => {
    return {
      type: 'SHOW',
      data: {content}
    }
  }
  
  export const hideNotification = () => {
    return {
      type: 'HIDE'
    }
  }

export default reducer