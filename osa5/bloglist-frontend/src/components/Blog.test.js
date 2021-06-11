import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {

    let component

    const blog = {
        title: 'sipulia',
        author: 'Sipali mies',
        url: 'www.sipsip.fi',
        likes: 16,
        user: {
            username: "hemppa",
            name: "Hemuli",
            id: '60670b60b41f5c2784c4633f'
        },
        id: '60671fd66f72d947c08d6493'
    }

    const user = {
        username: "hemppa",
        name: "Hemuli",
        id: '60670b60b41f5c2784c4633f'
    }

    const mockHandlerUpdate = jest.fn()

    const mockHandlerDelete = jest.fn()

    beforeEach(() => {
        component = render(
            <Blog
                blog = {blog}
                user = {user}
                updateBlog = {mockHandlerUpdate}
                deleteBlog = {mockHandlerDelete}
            />
        )
    })

    test('renders only default view by default', () => {
    
        // component.debug()
        const div1 = component.container.querySelector('.defaultView')
        const div2 = component.container.querySelector('.extendedView')
    
        expect(div1).toHaveTextContent(
            'sipulia / Sipali mies'
        )
        expect(div1).not.toHaveStyle('display: none')
    
        expect(div2).toHaveStyle('display: none')
    })

    test('renders extended view when view-button is pressed' , () => {
        const div1 = component.container.querySelector('.defaultView')
        const div2 = component.container.querySelector('.extendedView')

        // component.debug()
        
        const viewButton = component.container.querySelector('.viewButton')
        fireEvent.click(viewButton)

        // component.debug()

        expect(div1).toHaveStyle('display: none')
    
        expect(div2).not.toHaveStyle('display: none')

        expect(div2).toHaveTextContent(
            'www.sipsip.fi'
        )

        expect(div2).toHaveTextContent(
            '16'
        )


    })

    test('calls event handler twice when like-button is clicked twice', () => {

        // component.debug()
        
        const viewButton = component.container.querySelector('.viewButton')
        fireEvent.click(viewButton)

        // component.debug()

        const likeButton = component.container.querySelector('.likeButton')
        fireEvent.click(likeButton)
        fireEvent.click(likeButton)

        expect(mockHandlerUpdate.mock.calls).toHaveLength(2)

    })
})