import React from 'react'
import renderer from 'react-test-renderer'
import Graph from '../Graph'
import { Stat } from "../../model";

describe('Graph', () => {
    it.skip('should renders without errors and matches snapshot', () => {
        const data: Stat[] = [{
            code: 'UA',
            confirmed: 15300,
            recovered: 15000,
            deaths: 300,
        }]
        const tree = renderer.create(<Graph data={data} />)

        expect(tree.toJSON()).toBeTruthy()
        expect(tree).toMatchSnapshot()
    })
})
