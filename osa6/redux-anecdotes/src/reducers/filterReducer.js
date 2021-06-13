const initialState = {
    content: ''
}

const reducer = (state = initialState, action) => {
    // console.log('state now: ', state)
    // console.log('action', action)
    switch (action.type) {
        case 'CHANGE':
            const change = {
                content: action.data.content
            }
            return change
        default:
            return state
    }
}

export const changeFilter = (content) => {
    return ({
        type: 'CHANGE',
        data: {content}
    })
}

export default reducer