import summarizeNumericalFields from "../summarizeNumericalFields";

describe('summarizeNumericalFields:', () => {
    const data = [{
        bmw: 5,
        audi: 3,
        suzuki: 1,
        date: '2020-05-27',
    }, {
        bmw: 1,
        audi: 3,
        suzuki: 5,
        date: '2020-05-28',
    }, {
        bmw: 1,
        audi: 2,
        suzuki: 3,
        date: '2020-05-29',
    }]

    it('should return summary of all passed fields', () => {
        const all = summarizeNumericalFields(data, ['bmw', 'audi', 'suzuki'])
        const partial = summarizeNumericalFields(data, ['audi'])

        expect(typeof all).toBe('object')
        expect(all).toHaveProperty('bmw', 7)
        expect(all).toHaveProperty('audi', 8)
        expect(all).toHaveProperty('suzuki', 9)

        expect(typeof partial).toBe('object')
        expect(Object.keys(partial).length).toBe(1)
        expect(partial).toHaveProperty('audi', 8)
    })

    it('should return summary of all passed fields and filtered by passed condition', () => {
        const result = summarizeNumericalFields(
            data,
            ['bmw', 'audi', 'suzuki'],
            (item) => ['2020-05-29', '2020-05-28'].includes(item.date)
        )

        expect(result).toHaveProperty('bmw', 2)
        expect(result).toHaveProperty('audi', 5)
        expect(result).toHaveProperty('suzuki', 8)
    })
})
