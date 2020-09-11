import React from 'react'
import renderer from 'react-test-renderer'
import DateRangePicker from '../DateRangePicker'

describe('DateRangePicker', () => {
    it('should renders without errors and matches snapshot', () => {
        const tree = renderer.create(
            <DateRangePicker
                startDate={new Date(2020, 7, 27)}
                endDate={new Date(2020, 7, 28)}
                onChange={() => {}}
            />
        )

        expect(tree.toJSON()).toBeTruthy()
        expect(tree).toMatchSnapshot()
    })
})
