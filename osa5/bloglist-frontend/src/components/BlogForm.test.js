import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
    let component

    const mockHandlerCreate = jest.fn()

    beforeEach(() => {
        component = render(
            <BlogForm
                createBlog = {mockHandlerCreate}
            />
        )
    })

    test('renders basic strings', () => {
        expect(component.container).toHaveTextContent(
            'title'
        )
        expect(component.container).toHaveTextContent(
            'author'
        )
        expect(component.container).toHaveTextContent(
            'url'
        )
        expect(component.container).toHaveTextContent(
            'Create a new blog'
        )
    })

    test('callback function called with correct input', () => {
        const form = component.container.querySelector('form')
        const titleInput = component.container.querySelector('.titleInput')
        const authorInput = component.container.querySelector('.authorInput')
        const urlInput = component.container.querySelector('.urlInput')

        // component.debug()

        fireEvent.change(titleInput, { 
            target: { value: 'test-title' } 
        })
        fireEvent.change(authorInput, { 
            target: { value: 'test-author' } 
        })
        fireEvent.change(urlInput, { 
            target: { value: 'test-url' } 
        })
        fireEvent.submit(form)

        expect(mockHandlerCreate.mock.calls).toHaveLength(1)
        expect(mockHandlerCreate.mock.calls[0][0].title).toBe('test-title')
        expect(mockHandlerCreate.mock.calls[0][0].author).toBe('test-author')
        expect(mockHandlerCreate.mock.calls[0][0].url).toBe('test-url')

    })
})