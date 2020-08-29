import request from "supertest";
import moment from "moment";
import app from "../../../server";
import { DATE_FILTER_FORMAT } from '../../../shared//constants'

describe('GET /api/stats', () => {
    it('Should success and receive statistic', async () => {
        // choose a date where statistic is present
        const specificDay = '2020-8-27'
        const filter = { startDate: specificDay, endDate: specificDay }

        const response = await request(app)
            .get('/api/stats')
            .query(filter)

        const { status, body } = response
        const firstElement = body[0]

        expect(status).toBe(200)
        expect(Array.isArray(body)).toBeTruthy()
        expect(body.length).toBeTruthy()

        expect(typeof firstElement).toBe('object')
        expect(firstElement).toHaveProperty('confirmed')
        expect(firstElement).toHaveProperty('recovered')
        expect(firstElement).toHaveProperty('deaths')
        expect(firstElement).toHaveProperty('code')
        expect(typeof firstElement.confirmed).toBe('number')
        expect(typeof firstElement.recovered).toBe('number')
        expect(typeof firstElement.deaths).toBe('number')
        expect(typeof firstElement.code).toBe('string')
    })

    it('Should success without statistic', async () => {
        // there will never be statistic for the next day
        const tomorrow = moment().format(DATE_FILTER_FORMAT)
        const filter = { startDate: tomorrow, endDate: tomorrow }

        const response = await request(app)
            .get('/api/stats')
            .query(filter)

        const { status, body } = response
        const firstElement = body[0]

        expect(status).toBe(200)
        expect(Array.isArray(body)).toBeTruthy()
        expect(body.length).toBeFalsy()
    })
})
