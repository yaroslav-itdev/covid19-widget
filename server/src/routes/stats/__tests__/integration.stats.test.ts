import request from "supertest";
import moment from "moment";
import app from "../../../server";
import { DATE_FILTER_FORMAT } from '../../../shared//constants'

describe('GET /api/stats', () => {
    it('Should success', async () => {
        const yesterday = moment().subtract(1, 'day').format(DATE_FILTER_FORMAT)
        const filter = { startDate: yesterday, endDate: yesterday }

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
})
