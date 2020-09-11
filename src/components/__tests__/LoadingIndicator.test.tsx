import React from 'react'
import renderer from 'react-test-renderer'
import LoadingIndicator from '../LoadingIndicator'

describe('LoadingIndicator', () => {
    it('should renders without errors and matches snapshot', () => {
        const tree = renderer.create(<LoadingIndicator />)

        expect(tree.toJSON()).toBeTruthy()
        expect(tree).toMatchSnapshot()
    })
})
